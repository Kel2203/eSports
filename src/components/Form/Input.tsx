import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
    return (
        <input {...props} className="bg-zinc-900 font-sm placeholder:text-zinc-500 rounded px-4 py-3"
      />)
}