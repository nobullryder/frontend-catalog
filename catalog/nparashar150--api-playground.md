You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
api-playground.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronDown, Plus, Trash2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { cn, titleCase, parseCurlCommand } from '@/lib/utils'
import { APIConfig, APIMethod, Parameter, APITestResponse, CleanAPIConfig, APITool } from '@/lib/types'

type TabType = 'headers' | 'path' | 'query' | 'body'

interface APIPlaygroundProps {
  config?: APIConfig
  onConfigChange?: (config: APIConfig) => void
  onTest?: (config: APIConfig) => Promise<APITestResponse>
}

export function APIPlayground({
  config: initialConfig,
  onConfigChange,
  onTest
}: APIPlaygroundProps) {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('headers')
  const [config, setConfig] = useState<APIConfig>(initialConfig || {
    url: '',
    method: 'GET',
    headers: [],
    query: [],
    path: [],
    body: [],
    rawResponse: {}
  })

  useEffect(() => {
    if (onConfigChange) {
      onConfigChange(config)
    }
  }, [config, onConfigChange])

  const parseUrlToParams = (url: string) => {
    if (!url || url.startsWith('curl')) return { queryParams: [], pathParams: [] }

    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://example.com${url.startsWith('/') ? url : `/${url}`}`)

      // Extract query parameters
      const queryParams: Parameter[] = []
      urlObj.searchParams.forEach((value, key) => {
        queryParams.push({
          id: crypto.randomUUID(),
          key,
          value
        })
      })

      // Extract path parameters (segments that start with :)
      const pathSegments = urlObj.pathname.split('/').filter(segment => segment.startsWith(':'))
      const pathParams: Parameter[] = pathSegments.map(segment => ({
        id: crypto.randomUUID(),
        key: segment.substring(1), // remove the ':'
        value: ''
      }))

      return { queryParams, pathParams }
    } catch {
      // If URL parsing fails, try to extract query params manually
      const queryParams: Parameter[] = []
      const pathParams: Parameter[] = []

      // Extract query string
      const queryIndex = url.indexOf('?')
      if (queryIndex !== -1) {
        const queryString = url.substring(queryIndex + 1)
        const urlParams = new URLSearchParams(queryString)
        urlParams.forEach((value, key) => {
          queryParams.push({
            id: crypto.randomUUID(),
            key,
            value
          })
        })
      }

      // Extract path parameters
      const pathMatches = url.match(/:[a-zA-Z_][a-zA-Z0-9_]*/g)
      if (pathMatches) {
        pathMatches.forEach(match => {
          const key = match.substring(1)
          if (!pathParams.find(p => p.key === key)) {
            pathParams.push({
              id: crypto.randomUUID(),
              key,
              value: ''
            })
          }
        })
      }

      return { queryParams, pathParams }
    }
  }

  const updateConfig = <K extends keyof APIConfig>(key: K, value: APIConfig[K]) => {
    setConfig(prev => {
      const newConfig = { ...prev, [key]: value }

      // If URL is being updated, sync query and path parameters
      if (key === 'url' && value !== prev.url && typeof value === 'string' && !value.startsWith('curl')) {
        const { queryParams, pathParams } = parseUrlToParams(value)

        // Only update if the parsed params are different from current ones
        const currentQueryKeys = new Set(prev.query?.map(q => q.key) || [])
        const newQueryKeys = new Set(queryParams.map(q => q.key))
        const queryChanged = currentQueryKeys.size !== newQueryKeys.size ||
          [...currentQueryKeys].some(key => !newQueryKeys.has(key))

        const currentPathKeys = new Set(prev.path?.map(p => p.key) || [])
        const newPathKeys = new Set(pathParams.map(p => p.key))
        const pathChanged = currentPathKeys.size !== newPathKeys.size ||
          [...currentPathKeys].some(key => !newPathKeys.has(key))

        if (queryChanged || pathChanged) {
          return {
            ...newConfig,
            query: queryParams,
            path: pathParams
          }
        }
      }

      return newConfig
    })
  }

  const activeTabMap =
    activeTab === 'headers' ? config.headers :
    activeTab === 'query' ? config.query :
    activeTab === 'path' ? config.path :
    activeTab === 'body' ? config.body : []

  const buildUrlFromParams = (baseUrl: string, queryParams: Parameter[]) => {
    let url = baseUrl

    // Remove existing query string from base URL
    const queryIndex = url.indexOf('?')
    if (queryIndex !== -1) {
      url = url.substring(0, queryIndex)
    }

    // Add query parameters
    if (queryParams.length > 0) {
      const queryString = queryParams
        .filter(param => param.key && param.value)
        .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&')

      if (queryString) {
        url += `?${queryString}`
      }
    }

    return url
  }

  const setBody = (body: Parameter[]) => updateConfig('body', body)
  const setQuery = (query: Parameter[]) => {
    setConfig(prev => {
      const newConfig = { ...prev, query }
      // Update URL when query parameters change
      const currentUrl = newConfig.url || ''
      if (!currentUrl.startsWith('curl')) {
        const newUrl = buildUrlFromParams(currentUrl, query)
        return { ...newConfig, url: newUrl }
      }
      return newConfig
    })
  }
  const setPaths = (paths: Parameter[]) => updateConfig('path', paths)
  const setHeaders = (headers: Parameter[]) => updateConfig('headers', headers)

  const map = { headers: setHeaders, query: setQuery, body: setBody, path: setPaths }

  const updateActiveTabMapItem = (type: keyof typeof map, id: string, field: 'key' | 'value', value: string): void => {
    const oldItem = config[type]?.find((item: Parameter) => item.id === id)
    const updatedSettingsConfig = config[type]?.map((item: Parameter) =>
      item.id === id ? { ...item, [field]: value } : item
    )

    if (type === 'query') {
      // For query parameters, use setQuery to update URL automatically
      setQuery(updatedSettingsConfig)
    } else if (type === 'path' && field === 'key' && oldItem) {
      // Update path parameters and URL
      map[type](updatedSettingsConfig)

      const currentUrl = config.url || ''
      let updatedUrl = currentUrl

      if (oldItem.key) {
        const escapedOldKey = oldItem.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        updatedUrl = updatedUrl.replace(new RegExp(`:${escapedOldKey}(?=/|$)`, 'g'), `:${value}`)
      }

      updateConfig('url', updatedUrl)
    } else {
      // For headers, body, and path value changes, just update normally
      map[type](updatedSettingsConfig)
    }
  }

  const addActiveTabMapItem = (type: keyof typeof map) => {
    let paramName = ''
    const existingKeys = config[type]?.map((item: Parameter) => item.key) || []

    if (type === 'path') {
      let counter = 1
      paramName = `param${counter}`

      while (existingKeys.includes(paramName)) {
        counter++
        paramName = `param${counter}`
      }
    }

    const newItem: Parameter = {
      id: crypto.randomUUID(),
      value: '',
      key: type === 'path' ? paramName : ''
    }

    const updatedItems = [...(config[type] || []), newItem]

    if (type === 'query') {
      // For query parameters, use setQuery to update URL automatically
      setQuery(updatedItems)
    } else if (type === 'path' && paramName) {
      // Update path parameters and URL
      map[type](updatedItems)
      updateConfig('url', `${config.url}/:${paramName}`)
    } else {
      // For headers and body, just update normally
      map[type](updatedItems)
    }
  }

  const removeActiveTabMapItem = (type: keyof typeof map, itemId: string) => {
    const itemToRemove = config[type]?.find((item: Parameter) => item.id === itemId)
    const filteredItems = config[type]?.filter((item: Parameter) => item.id !== itemId) || []

    if (type === 'query') {
      // For query parameters, use setQuery to update URL automatically
      setQuery(filteredItems)
    } else if (type === 'path' && itemToRemove?.key) {
      // Update path parameters
      map[type](filteredItems)

      // Update URL to remove the path parameter
      const currentUrl = config.url || ''
      const escapedKey = itemToRemove.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const placeholderRegex = new RegExp(`/?:${escapedKey}(?=/|$)/?`, 'g')

      const updatedUrl = currentUrl
        .replace(placeholderRegex, (match) => {
          if (match.startsWith('/') && match.endsWith('/')) return '/'
          return ''
        })
        .replace(/([^:]\/)\/+/g, '$1')
        .replace(/\/$/, '')

      updateConfig('url', updatedUrl)
    } else {
      // For headers and body, just update normally
      map[type](filteredItems)
    }
  }

  const testApi = async () => {
    if (!onTest) {
      console.error('onTest function not provided')
      return
    }

    setLoading(true)

    try {
      const response = await onTest(config)
      console.log('onTest returned:', response)

      // Flexible extraction of status
      const status =
        (response && (response.status_code ?? response.status ?? response.statusCode)) ??
        undefined

      // Flexible extraction of body/data
      const data =
        (response && (response.response ?? response.responseBody ?? response.data ?? response.body)) ??
        response

      updateConfig('rawResponse', {
        status,
        data
      })

      // optionally, show a message if nothing useful was returned
      if (status === undefined && !data) {
        console.warn('onTest returned no status/data — check the onTest implementation')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error('API test failed:', error)
      updateConfig('rawResponse', {
        error: message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCurlParse = useCallback((curlCommand: string) => {
    try {
      // Use the parseCurlCommand function from utils
      const parsed = parseCurlCommand(curlCommand)

      // Convert parsed result to the format expected by setConfig
      const newConfig: APIConfig = {
        url: parsed.url || '',
        method: (parsed.method || 'GET') as APIMethod,
        headers: parsed.headers || [],
        query: parsed.query || [],
        path: parsed.path || [],
        body: parsed.body || [],
        rawResponse: config.rawResponse
      }

      setConfig(newConfig)
    } catch (error) {
      console.error('Error parsing cURL command:', error)
    }
  }, [config.rawResponse])

  const applyExampleConfig = (example: 'posts' | 'todos' | 'create') => {
    const preset = example === 'posts' ? DUMMY_POSTS_TOOL_CONFIG :
                  example === 'todos' ? DUMMY_TODOS_TOOL_CONFIG :
                  CREATE_POST_EXAMPLE

    setConfig(preset.config)
  }

  useEffect(() => {
    const url = config.url

    if (url?.trim().toLowerCase().startsWith('curl ')) {
      handleCurlParse(url)
    }
  }, [config.url, handleCurlParse])

  const getCleanConfig = (): CleanAPIConfig => {
    const clean: CleanAPIConfig = {
      url: config.url,
      method: config.method
    }

    if (config.headers?.length > 0) {
      clean.headers = config.headers.map(h => ({
        key: h.key,
        value: h.value
      }))
    }

    if (config.query?.length > 0) {
      clean.query = config.query.map(q => ({
        key: q.key,
        value: q.value
      }))
    }

    if (config.path?.length > 0) {
      clean.path = config.path.map(p => ({
        key: p.key,
        value: p.value
      }))
    }

    if (config.body?.length > 0) {
      clean.body = config.body.map(b => ({
        key: b.key,
        value: b.value
      }))
    }

    return clean
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full gap-4 bg-white dark:bg-neutral-950">
      {/* Left side - Configuration */}
      <ResizablePanel defaultSize={66} minSize={50}>
        <div className="flex flex-col gap-4 h-full p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/40">
          <div className="flex flex-col sm:flex-row gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-[90px] justify-between">
                  {config.method}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((method) => (
                  <DropdownMenuItem
                    key={method}
                    onClick={() => updateConfig('method', method as APIMethod)}
                  >
                    <div className="flex items-center">
                      {method}
                      {config.method === method && (
                        <Check className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              placeholder="Enter API URL or paste cURL command"
              value={config.url}
              onChange={(e) => updateConfig('url', e.target.value)}
              className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
            />
          </div>

          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700">
            {[
              { value: 'headers', label: 'Headers', supportedTab: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
              { value: 'path', label: 'Path', supportedTab: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
              { value: 'query', label: 'Query', supportedTab: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
              { value: 'body', label: 'Body', supportedTab: ['POST', 'PUT', 'PATCH'] }
            ]
              .filter((t) => t.supportedTab.includes(config.method))
              .map((t) => (
                <button
                  key={t.value}
                  onClick={() => setActiveTab(t.value as TabType)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors rounded-t-md',
                    activeTab === t.value
                      ? 'border-blue-500 bg-white/60 dark:bg-neutral-800/60 text-blue-600 dark:text-blue-300'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  )}
                >
                  {t.label}
                </button>
              ))}
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {['headers', 'query', 'path'].includes(activeTab) && (
              <div className="space-y-3">
                {activeTabMap?.map((activeTabMapItem: Parameter) => (
                  <div key={activeTabMapItem.id} className="flex items-center gap-3">
                    <Input
                      placeholder="Key"
                      className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
                      value={activeTabMapItem.key}
                      disabled={activeTab === 'path'}
                      onChange={(e) => updateActiveTabMapItem(activeTab as keyof typeof map, activeTabMapItem.id, 'key', e.target.value)}
                    />
                    <Input
                      placeholder="Value"
                      className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
                      value={activeTabMapItem.value}
                      onChange={(e) => updateActiveTabMapItem(activeTab as keyof typeof map, activeTabMapItem.id, 'value', e.target.value)}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 rounded-md border border-red-200/60 dark:border-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-50/30 dark:hover:bg-red-900/25 transition-colors flex-shrink-0"
                      onClick={() => removeActiveTabMapItem(activeTab as keyof typeof map, activeTabMapItem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 h-10"
                  onClick={() => addActiveTabMapItem(activeTab as keyof typeof map)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add {titleCase(activeTab)}
                </Button>
              </div>
            )}

            {activeTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(config.method) && (
              <div className="space-y-3">
                {config.body?.map((bodyItem: Parameter) => (
                  <div key={bodyItem.id} className="flex items-center gap-3">
                    <Input
                      placeholder="Key"
                      value={bodyItem.key}
                      onChange={(e) => updateActiveTabMapItem('body', bodyItem.id, 'key', e.target.value)}
                      className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
                    />
                    <Input
                      placeholder="Value"
                      className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
                      onChange={(e) => updateActiveTabMapItem('body', bodyItem.id, 'value', e.target.value)}
                      value={bodyItem.value}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-md border border-red-200/60 dark:border-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-50/30 dark:hover:bg-red-900/25 transition-colors flex-shrink-0"
                      onClick={() => removeActiveTabMapItem('body', bodyItem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 h-10"
                  onClick={() => addActiveTabMapItem('body')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={loading} variant="outline" size="sm" className="h-10">
                  Examples
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => applyExampleConfig('posts')}>GET Posts</DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyExampleConfig('todos')}>GET Todos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyExampleConfig('create')}>POST Create</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={testApi}
              disabled={!config.url?.trim() || loading}
              variant="default"
              size="sm"
              className="h-10 px-6"
            >
              {loading ? 'Testing...' : 'Test API'}
            </Button>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right side - JSON preview */}
      <ResizablePanel defaultSize={34} minSize={25}>
        <div className="h-full">
          <ResizablePanelGroup direction="vertical" className="gap-4">
            {/* Configuration JSON - Top Half */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/40">
                <div className="p-4 h-full flex flex-col">
                  <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2">Configuration JSON</h3>
                  <pre className="text-xs overflow-auto flex-1 bg-gray-50 dark:bg-neutral-950/50 rounded-lg p-4 text-gray-800 dark:text-gray-100 font-mono">
                    {JSON.stringify(getCleanConfig(), null, 2)}
                  </pre>
                </div>
              </div>
            </ResizablePanel>

            {/* Response JSON - Bottom Half */}
            {config.rawResponse && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="h-full bg-white dark:bg-gradient-to-br dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/40">
                    <div className="p-4 h-full flex flex-col">
                      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2">Response JSON</h3>
                      <pre className="text-xs overflow-auto flex-1 bg-gray-50 dark:bg-neutral-950/50 rounded-lg p-4 font-mono">
                        {config.rawResponse.error ? (
                          <span className="text-red-700 dark:text-red-300 font-medium">{config.rawResponse.error}</span>
                        ) : (
                          <span className="text-gray-800 dark:text-gray-100">{JSON.stringify(config.rawResponse.data, null, 2)}</span>
                        )}
                      </pre>
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

const DUMMY_POSTS_TOOL_CONFIG: Omit<APITool, 'tool_type'> = {
  name: 'get_posts',
  config: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    headers: [
      {
        id: 'header-1',
        key: 'Accept',
        value: 'application/json'
      }
    ],
    query: [
      {
        id: 'query-1',
        key: 'userId',
        value: '1'
      }
    ],
    path: [],
    body: []
  }
}

const DUMMY_TODOS_TOOL_CONFIG: Omit<APITool, 'tool_type'> = {
  name: 'get_todos',
  config: {
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'GET',
    headers: [
      {
        id: 'header-1',
        key: 'Accept',
        value: 'application/json'
      }
    ],
    query: [
      {
        id: 'query-1',
        key: 'completed',
        value: 'false'
      }
    ],
    path: [],
    body: [],
  }
}

const CREATE_POST_EXAMPLE: Omit<APITool, 'tool_type'> = {
  name: 'create_post',
  config: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    headers: [
      {
        id: 'header-1',
        key: 'Content-Type',
        value: 'application/json'
      }
    ],
    query: [],
    path: [],
    body: [
      {
        id: 'body-1',
        key: 'title',
        value: 'My New Post'
      },
      {
        id: 'body-2',
        key: 'body',
        value: 'This is the post content'
      },
      {
        id: 'body-3',
        key: 'userId',
        value: '1'
      }
    ],
  }
}

code.demo.1758644065471.tsx
import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APIPlayground } from "@/components/ui/api-playground";

export default function APIPlaygroundDemo() {
  const [config, setConfig] = useState<APIConfig>({
    url: "",
    method: "GET",
    headers: [],
    query: [],
    path: [],
    body: [],
  });

  const handleTest = async (config: APIConfig): Promise<APITestResponse> => {
    console.log("Testing API with config:", config);

    // Build URL + query params
    let url = config.url;
    const queryParams = new URLSearchParams();
    config.query?.forEach((p) => {
      if (p.key && p.value) queryParams.append(p.key, p.value);
    });
    if (queryParams.toString()) url += `?${queryParams.toString()}`;

    // Build headers
    const headers: Record<string, string> = {};
    config.headers?.forEach((p) => {
      if (p.key && p.value) headers[p.key] = p.value;
    });

    // Build body
    let body: string | undefined = undefined;
    if (["POST", "PUT", "PATCH"].includes(config.method)) {
      const bodyData: JSONObject = {};
      config.body?.forEach((p) => {
        if (p.key) bodyData[p.key] = p.value;
      });
      body = JSON.stringify(bodyData);
      headers["Content-Type"] = headers["Content-Type"] || "application/json";
    }

    try {
      const response = await fetch(url, {
        method: config.method,
        headers,
        body: body,
        // optional: mode: 'cors' // uncomment if needed
      });

      if (!response.ok) {
        // try parse error body, fallback to status text
        let errText = response.statusText;
        try {
          const errJson = await response.json();
          errText = errJson?.error || JSON.stringify(errJson);
        } catch {}
        throw new Error(
          errText || `Request failed with status ${response.status}`
        );
      }

      // Try JSON, fallback to text
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return await response.json();
      } else {
        const text = await response.text();
        // adapt this to APITestResponse shape if needed
        return {
          status: response.status,
          body: text,
        } as unknown as APITestResponse;
      }
    } catch (error) {
      console.error("API test failed:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-neutral-950">
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-nowrap flex-row items-center justify-between w-full mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                API Playground
              </h1>
              <p className="text-gray-600 dark:text-gray-100">
                Test and configure APIs with a clean, powerful interface
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() =>
                window.open("https://github.com/nparashar150/21st", "_blank")
              }
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              View Code
            </Button>
          </div>

          <div className="bg-white dark:bg-neutral-950 rounded-lg shadow-sm border p-4 h-[600px]">
            <APIPlayground
              config={config}
              onTest={handleTest}
              onConfigChange={setConfig}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/api-playground.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ChevronDown, Plus, Trash2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { cn, titleCase, parseCurlCommand } from '@/lib/utils'
import { APIConfig, APIMethod, Parameter, APITestResponse, CleanAPIConfig, APITool } from '@/lib/types'

type TabType = 'headers' | 'path' | 'query' | 'body'

interface APIPlaygroundProps {
  config?: APIConfig
  onConfigChange?: (config: APIConfig) => void
  onTest?: (config: APIConfig) => Promise<APITestResponse>
}

export function APIPlayground({
  config: initialConfig,
  onConfigChange,
  onTest
}: APIPlaygroundProps) {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('headers')
  const [config, setConfig] = useState<APIConfig>(initialConfig || {
    url: '',
    method: 'GET',
    headers: [],
    query: [],
    path: [],
    body: [],
    rawResponse: {}
  })

  useEffect(() => {
    if (onConfigChange) {
      onConfigChange(config)
    }
  }, [config, onConfigChange])

  const parseUrlToParams = (url: string) => {
    if (!url || url.startsWith('curl')) return { queryParams: [], pathParams: [] }

    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://example.com${url.startsWith('/') ? url : `/${url}`}`)

      // Extract query parameters
      const queryParams: Parameter[] = []
      urlObj.searchParams.forEach((value, key) => {
        queryParams.push({
          id: crypto.randomUUID(),
          key,
          value
        })
      })

      // Extract path parameters (segments that start with :)
      const pathSegments = urlObj.pathname.split('/').filter(segment => segment.startsWith(':'))
      const pathParams: Parameter[] = pathSegments.map(segment => ({
        id: crypto.randomUUID(),
        key: segment.substring(1), // remove the ':'
        value: ''
      }))

      return { queryParams, pathParams }
    } catch {
      // If URL parsing fails, try to extract query params manually
      const queryParams: Parameter[] = []
      const pathParams: Parameter[] = []

      // Extract query string
      const queryIndex = url.indexOf('?')
      if (queryIndex !== -1) {
        const queryString = url.substring(queryIndex + 1)
        const urlParams = new URLSearchParams(queryString)
        urlParams.forEach((value, key) => {
          queryParams.push({
            id: crypto.randomUUID(),
            key,
            value
          })
        })
      }

      // Extract path parameters
      const pathMatches = url.match(/:[a-zA-Z_][a-zA-Z0-9_]*/g)
      if (pathMatches) {
        pathMatches.forEach(match => {
          const key = match.substring(1)
          if (!pathParams.find(p => p.key === key)) {
            pathParams.push({
              id: crypto.randomUUID(),
              key,
              value: ''
            })
          }
        })
      }

      return { queryParams, pathParams }
    }
  }

  const updateConfig = <K extends keyof APIConfig>(key: K, value: APIConfig[K]) => {
    setConfig(prev => {
      const newConfig = { ...prev, [key]: value }

      // If URL is being updated, sync query and path parameters
      if (key === 'url' && value !== prev.url && typeof value === 'string' && !value.startsWith('curl')) {
        const { queryParams, pathParams } = parseUrlToParams(value)

        // Only update if the parsed params are different from current ones
        const currentQueryKeys = new Set(prev.query?.map(q => q.key) || [])
        const newQueryKeys = new Set(queryParams.map(q => q.key))
        const queryChanged = currentQueryKeys.size !== newQueryKeys.size ||
          [...currentQueryKeys].some(key => !newQueryKeys.has(key))

        const currentPathKeys = new Set(prev.path?.map(p => p.key) || [])
        const newPathKeys = new Set(pathParams.map(p => p.key))
        const pathChanged = currentPathKeys.size !== newPathKeys.size ||
          [...currentPathKeys].some(key => !newPathKeys.has(key))

        if (queryChanged || pathChanged) {
          return {
            ...newConfig,
            query: queryParams,
            path: pathParams
          }
        }
      }

      return newConfig
    })
  }

  const activeTabMap =
    activeTab === 'headers' ? config.headers :
    activeTab === 'query' ? config.query :
    activeTab === 'path' ? config.path :
    activeTab === 'body' ? config.body : []

  const buildUrlFromParams = (baseUrl: string, queryParams: Parameter[]) => {
    let url = baseUrl

    // Remove existing query string from base URL
    const queryIndex = url.indexOf('?')
    if (queryIndex !== -1) {
      url = url.substring(0, queryIndex)
    }

    // Add query parameters
    if (queryParams.length > 0) {
      const queryString = queryParams
        .filter(param => param.key && param.value)
        .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&')

      if (queryString) {
        url += `?${queryString}`
      }
    }

    return url
  }

  const setBody = (body: Parameter[]) => updateConfig('body', body)
  const setQuery = (query: Parameter[]) => {
    setConfig(prev => {
      const newConfig = { ...prev, query }
      // Update URL when query parameters change
      const currentUrl = newConfig.url || ''
      if (!currentUrl.startsWith('curl')) {
        const newUrl = buildUrlFromParams(currentUrl, query)
        return { ...newConfig, url: newUrl }
      }
      return newConfig
    })
  }
  const setPaths = (paths: Parameter[]) => updateConfig('path', paths)
  const setHeaders = (headers: Parameter[]) => updateConfig('headers', headers)

  const map = { headers: setHeaders, query: setQuery, body: setBody, path: setPaths }

  const updateActiveTabMapItem = (type: keyof typeof map, id: string, field: 'key' | 'value', value: string): void => {
    const oldItem = config[type]?.find((item: Parameter) => item.id === id)
    const updatedSettingsConfig = config[type]?.map((item: Parameter) =>
      item.id === id ? { ...item, [field]: value } : item
    )

    if (type === 'query') {
      // For query parameters, use setQuery to update URL automatically
      setQuery(updatedSettingsConfig)
    } else if (type === 'path' && field === 'key' && oldItem) {
      // Update path parameters and URL
      map[type](updatedSettingsConfig)

      const currentUrl = config.url || ''
      let updatedUrl = currentUrl

      if (oldItem.key) {
        const escapedOldKey = oldItem.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        updatedUrl = updatedUrl.replace(new RegExp(`:${escapedOldKey}(?=/|$)`, 'g'), `:${value}`)
      }

      updateConfig('url', updatedUrl)
    } else {
      // For headers, body, and path value changes, just update normally
      map[type](updatedSettingsConfig)
    }
  }

  const addActiveTabMapItem = (type: keyof typeof map) => {
    let paramName = ''
    const existingKeys = config[type]?.map((item: Parameter) => item.key) || []

    if (type === 'path') {
      let counter = 1
      paramName = `param${counter}`

      while (existingKeys.includes(paramName)) {
        counter++
        paramName = `param${counter}`
      }
    }

    const newItem: Parameter = {
      id: crypto.randomUUID(),
      value: '',
      key: type === 'path' ? paramName : ''
    }

    const updatedItems = [...(config[type] || []), newItem]

    if (type === 'query') {
      // For query parameters, use setQuery to update URL automatically
      setQuery(updatedItems)
    } else if (type === 'path' && paramName) {
      // Update path parameters and URL
      map[type](updatedItems)
      updateConfig('url', `${config.url}/:${paramName}`)
    } else {
      // For headers and body, just update normally
      map[type](updatedItems)
    }
  }

  const removeActiveTabMapItem = (type: keyof typeof map, itemId: string) => {
    const itemToRemove = config[type]?.find((item: Parameter) => item.id === itemId)
    const filteredItems = config[type]?.filter((item: Parameter) => item.id !== itemId) || []

    if (type === 'query') {
      // For query parameters, use setQuery to update URL automatically
      setQuery(filteredItems)
    } else if (type === 'path' && itemToRemove?.key) {
      // Update path parameters
      map[type](filteredItems)

      // Update URL to remove the path parameter
      const currentUrl = config.url || ''
      const escapedKey = itemToRemove.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const placeholderRegex = new RegExp(`/?:${escapedKey}(?=/|$)/?`, 'g')

      const updatedUrl = currentUrl
        .replace(placeholderRegex, (match) => {
          if (match.startsWith('/') && match.endsWith('/')) return '/'
          return ''
        })
        .replace(/([^:]\/)\/+/g, '$1')
        .replace(/\/$/, '')

      updateConfig('url', updatedUrl)
    } else {
      // For headers and body, just update normally
      map[type](filteredItems)
    }
  }

  const testApi = async () => {
    if (!onTest) {
      console.error('onTest function not provided')
      return
    }

    setLoading(true)

    try {
      const response = await onTest(config)
      console.log('onTest returned:', response)

      // Flexible extraction of status
      const status =
        (response && (response.status_code ?? response.status ?? response.statusCode)) ??
        undefined

      // Flexible extraction of body/data
      const data =
        (response && (response.response ?? response.responseBody ?? response.data ?? response.body)) ??
        response

      updateConfig('rawResponse', {
        status,
        data
      })

      // optionally, show a message if nothing useful was returned
      if (status === undefined && !data) {
        console.warn('onTest returned no status/data — check the onTest implementation')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error('API test failed:', error)
      updateConfig('rawResponse', {
        error: message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCurlParse = useCallback((curlCommand: string) => {
    try {
      // Use the parseCurlCommand function from utils
      const parsed = parseCurlCommand(curlCommand)

      // Convert parsed result to the format expected by setConfig
      const newConfig: APIConfig = {
        url: parsed.url || '',
        method: (parsed.method || 'GET') as APIMethod,
        headers: parsed.headers || [],
        query: parsed.query || [],
        path: parsed.path || [],
        body: parsed.body || [],
        rawResponse: config.rawResponse
      }

      setConfig(newConfig)
    } catch (error) {
      console.error('Error parsing cURL command:', error)
    }
  }, [config.rawResponse])

  const applyExampleConfig = (example: 'posts' | 'todos' | 'create') => {
    const preset = example === 'posts' ? DUMMY_POSTS_TOOL_CONFIG :
                  example === 'todos' ? DUMMY_TODOS_TOOL_CONFIG :
                  CREATE_POST_EXAMPLE

    setConfig(preset.config)
  }

  useEffect(() => {
    const url = config.url

    if (url?.trim().toLowerCase().startsWith('curl ')) {
      handleCurlParse(url)
    }
  }, [config.url, handleCurlParse])

  const getCleanConfig = (): CleanAPIConfig => {
    const clean: CleanAPIConfig = {
      url: config.url,
      method: config.method
    }

    if (config.headers?.length > 0) {
      clean.headers = config.headers.map(h => ({
        key: h.key,
        value: h.value
      }))
    }

    if (config.query?.length > 0) {
      clean.query = config.query.map(q => ({
        key: q.key,
        value: q.value
      }))
    }

    if (config.path?.length > 0) {
      clean.path = config.path.map(p => ({
        key: p.key,
        value: p.value
      }))
    }

    if (config.body?.length > 0) {
      clean.body = config.body.map(b => ({
        key: b.key,
        value: b.value
      }))
    }

    return clean
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full gap-4 bg-white dark:bg-neutral-950">
      {/* Left side - Configuration */}
      <ResizablePanel defaultSize={66} minSize={50}>
        <div className="flex flex-col gap-4 h-full p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/40">
          <div className="flex flex-col sm:flex-row gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-[90px] justify-between">
                  {config.method}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((method) => (
                  <DropdownMenuItem
                    key={method}
                    onClick={() => updateConfig('method', method as APIMethod)}
                  >
                    <div className="flex items-center">
                      {method}
                      {config.method === method && (
                        <Check className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              placeholder="Enter API URL or paste cURL command"
              value={config.url}
              onChange={(e) => updateConfig('url', e.target.value)}
              className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
            />
          </div>

          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700">
            {[
              { value: 'headers', label: 'Headers', supportedTab: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
              { value: 'path', label: 'Path', supportedTab: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
              { value: 'query', label: 'Query', supportedTab: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
              { value: 'body', label: 'Body', supportedTab: ['POST', 'PUT', 'PATCH'] }
            ]
              .filter((t) => t.supportedTab.includes(config.method))
              .map((t) => (
                <button
                  key={t.value}
                  onClick={() => setActiveTab(t.value as TabType)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors rounded-t-md',
                    activeTab === t.value
                      ? 'border-blue-500 bg-white/60 dark:bg-neutral-800/60 text-blue-600 dark:text-blue-300'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  )}
                >
                  {t.label}
                </button>
              ))}
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {['headers', 'query', 'path'].includes(activeTab) && (
              <div className="space-y-3">
                {activeTabMap?.map((activeTabMapItem: Parameter) => (
                  <div key={activeTabMapItem.id} className="flex items-center gap-3">
                    <Input
                      placeholder="Key"
                      className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
                      value={activeTabMapItem.key}
                      disabled={activeTab === 'path'}
                      onChange={(e) => updateActiveTabMapItem(activeTab as keyof typeof map, activeTabMapItem.id, 'key', e.target.value)}
                    />
                    <Input
                      placeholder="Value"
                      className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
                      value={activeTabMapItem.value}
                      onChange={(e) => updateActiveTabMapItem(activeTab as keyof typeof map, activeTabMapItem.id, 'value', e.target.value)}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 rounded-md border border-red-200/60 dark:border-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-50/30 dark:hover:bg-red-900/25 transition-colors flex-shrink-0"
                      onClick={() => removeActiveTabMapItem(activeTab as keyof typeof map, activeTabMapItem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 h-10"
                  onClick={() => addActiveTabMapItem(activeTab as keyof typeof map)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add {titleCase(activeTab)}
                </Button>
              </div>
            )}

            {activeTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(config.method) && (
              <div className="space-y-3">
                {config.body?.map((bodyItem: Parameter) => (
                  <div key={bodyItem.id} className="flex items-center gap-3">
                    <Input
                      placeholder="Key"
                      value={bodyItem.key}
                      onChange={(e) => updateActiveTabMapItem('body', bodyItem.id, 'key', e.target.value)}
                      className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
                    />
                    <Input
                      placeholder="Value"
                      className="flex-1 h-10 bg-white/95 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-400/25"
                      onChange={(e) => updateActiveTabMapItem('body', bodyItem.id, 'value', e.target.value)}
                      value={bodyItem.value}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-md border border-red-200/60 dark:border-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-50/30 dark:hover:bg-red-900/25 transition-colors flex-shrink-0"
                      onClick={() => removeActiveTabMapItem('body', bodyItem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 h-10"
                  onClick={() => addActiveTabMapItem('body')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={loading} variant="outline" size="sm" className="h-10">
                  Examples
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => applyExampleConfig('posts')}>GET Posts</DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyExampleConfig('todos')}>GET Todos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyExampleConfig('create')}>POST Create</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={testApi}
              disabled={!config.url?.trim() || loading}
              variant="default"
              size="sm"
              className="h-10 px-6"
            >
              {loading ? 'Testing...' : 'Test API'}
            </Button>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right side - JSON preview */}
      <ResizablePanel defaultSize={34} minSize={25}>
        <div className="h-full">
          <ResizablePanelGroup direction="vertical" className="gap-4">
            {/* Configuration JSON - Top Half */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/40">
                <div className="p-4 h-full flex flex-col">
                  <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2">Configuration JSON</h3>
                  <pre className="text-xs overflow-auto flex-1 bg-gray-50 dark:bg-neutral-950/50 rounded-lg p-4 text-gray-800 dark:text-gray-100 font-mono">
                    {JSON.stringify(getCleanConfig(), null, 2)}
                  </pre>
                </div>
              </div>
            </ResizablePanel>

            {/* Response JSON - Bottom Half */}
            {config.rawResponse && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="h-full bg-white dark:bg-gradient-to-br dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/40">
                    <div className="p-4 h-full flex flex-col">
                      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-2">Response JSON</h3>
                      <pre className="text-xs overflow-auto flex-1 bg-gray-50 dark:bg-neutral-950/50 rounded-lg p-4 font-mono">
                        {config.rawResponse.error ? (
                          <span className="text-red-700 dark:text-red-300 font-medium">{config.rawResponse.error}</span>
                        ) : (
                          <span className="text-gray-800 dark:text-gray-100">{JSON.stringify(config.rawResponse.data, null, 2)}</span>
                        )}
                      </pre>
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

const DUMMY_POSTS_TOOL_CONFIG: Omit<APITool, 'tool_type'> = {
  name: 'get_posts',
  config: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    headers: [
      {
        id: 'header-1',
        key: 'Accept',
        value: 'application/json'
      }
    ],
    query: [
      {
        id: 'query-1',
        key: 'userId',
        value: '1'
      }
    ],
    path: [],
    body: []
  }
}

const DUMMY_TODOS_TOOL_CONFIG: Omit<APITool, 'tool_type'> = {
  name: 'get_todos',
  config: {
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'GET',
    headers: [
      {
        id: 'header-1',
        key: 'Accept',
        value: 'application/json'
      }
    ],
    query: [
      {
        id: 'query-1',
        key: 'completed',
        value: 'false'
      }
    ],
    path: [],
    body: [],
  }
}

const CREATE_POST_EXAMPLE: Omit<APITool, 'tool_type'> = {
  name: 'create_post',
  config: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    headers: [
      {
        id: 'header-1',
        key: 'Content-Type',
        value: 'application/json'
      }
    ],
    query: [],
    path: [],
    body: [
      {
        id: 'body-1',
        key: 'title',
        value: 'My New Post'
      },
      {
        id: 'body-2',
        key: 'body',
        value: 'This is the post content'
      },
      {
        id: 'body-3',
        key: 'userId',
        value: '1'
      }
    ],
  }
}
```

Install NPM dependencies:
```bash
lucide-react
```

Implementation Guidelines
1. Analyze the component structure and identify all required dependencies
2. Review the component's argumens and state
3. Identify any required context providers or hooks and install them
4. Questions to Ask
- What data/props will be passed to this component?
- Are there any specific state management requirements?
- Are there any required assets (images, icons, etc.)?
- What is the expected responsive behavior?
- What is the best place to use this component in the app?

Steps to integrate
0. Copy paste all the code above in the correct directories
1. Install external dependencies
2. Fill image assets with Unsplash stock images you know exist
3. Use lucide-react icons for svgs or logos if component requires them

Remember: Do not change the component's code unless it's required to integrate or the user asks you to.
IMPORTANT: Create all mentioned files in full, without abbreviations. Do not use placeholders like "insert the rest of the code here" – output every line of code exactly as it is, so it can be copied and pasted directly into the project.
