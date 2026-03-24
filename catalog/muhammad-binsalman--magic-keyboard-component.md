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
magic-keyboard-component.tsx
import { ArrowLeft, ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
function Keyboard(){
  return (
    <div className="flex flex-col gap-1 p-5 rounded-xl bg-gray-300 shadow-md w-[600px] select-none">
      {/* Row 1 - Function keys */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">esc</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F1</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F2</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F3</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F4</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F5</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F6</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F7</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F8</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F9</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F10</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F11</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F12</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-5 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 ml-4">⏏</div>
      </div>

      {/* Row 2 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">`</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">1</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">2</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">3</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">4</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">5</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">6</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">7</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">8</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">9</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">0</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">-</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">=</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-5 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">delete</div>
      </div>

      {/* Row 3 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[2]">tab</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">Q</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">W</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">E</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">R</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">T</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">Y</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">U</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">I</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">O</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">P</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">[</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">]</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[2]">\</div>
      </div>

      {/* Row 4 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[2]">caps lock</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">A</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">S</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">D</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">F</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">G</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">H</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">J</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">K</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">L</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">;</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">'</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[2]">return</div>
      </div>

      {/* Row 5 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[3]">shift</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">Z</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">X</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">C</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">V</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">B</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">N</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">M</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">,</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">.</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">/</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[3]">shift</div>
      </div>

      {/* Row 6 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">fn</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">ctrl</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center p-0.5 text-base text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">⌥</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center p-0.5 text-base text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">⌘</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[175px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[5]"></div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center p-0.5 text-base text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">⌘</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center p-0.5 text-base text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">⌥</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[30px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5"><ArrowLeft size={16} /></div>
        <div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[30px] text-center py-0.5 px-2 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5"><ArrowDown size={13} /></div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[30px] text-center py-0.5 px-2 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5"><ArrowUp size={13} /></div>
        </div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[30px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5"><ArrowRight size={16} /></div>
      </div>
    </div>
  );
};

export default Keyboard;

code.demo.1757501755926.tsx
import Keyboard from "@/components/ui/magic-keyboard-component";

export default function DemoOne() {
  return <main className="bg-neutral-50 w-full h-screen flex items-center justify-center"><Keyboard/></main>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/magic-keyboard-component.tsx
import { ArrowLeft, ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
function Keyboard(){
  return (
    <div className="flex flex-col gap-1 p-5 rounded-xl bg-gray-300 shadow-md w-[600px] select-none">
      {/* Row 1 - Function keys */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">esc</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F1</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F2</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F3</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F4</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F5</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F6</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F7</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F8</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F9</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F10</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F11</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 max-h-[25px]">F12</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-1 px-5 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 ml-4">⏏</div>
      </div>

      {/* Row 2 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">`</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">1</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">2</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">3</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">4</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">5</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">6</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">7</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">8</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">9</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">0</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">-</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">=</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-5 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">delete</div>
      </div>

      {/* Row 3 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[2]">tab</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">Q</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">W</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">E</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">R</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">T</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">Y</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">U</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">I</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">O</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">P</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">[</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">]</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[2]">\</div>
      </div>

      {/* Row 4 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[2]">caps lock</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">A</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">S</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">D</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">F</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">G</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">H</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">J</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">K</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">L</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">;</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">'</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[2]">return</div>
      </div>

      {/* Row 5 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[3]">shift</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">Z</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">X</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">C</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">V</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">B</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">N</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">M</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">,</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">.</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">/</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[3]">shift</div>
      </div>

      {/* Row 6 */}
      <div className="flex gap-0.5">
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">fn</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">ctrl</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center p-0.5 text-base text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">⌥</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center p-0.5 text-base text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">⌘</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[175px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5 flex-[5]"></div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center p-0.5 text-base text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">⌘</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[35px] text-center p-0.5 text-base text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5">⌥</div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[30px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5"><ArrowLeft size={16} /></div>
        <div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[30px] text-center py-0.5 px-2 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5"><ArrowDown size={13} /></div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[30px] text-center py-0.5 px-2 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5"><ArrowUp size={13} /></div>
        </div>
        <div className="bg-gray-100 border border-gray-400 rounded-md shadow-sm min-w-[30px] text-center py-2 px-1 text-xs text-gray-800 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200 hover:-translate-y-0.5 active:translate-y-0.5"><ArrowRight size={16} /></div>
      </div>
    </div>
  );
};

export default Keyboard;
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
