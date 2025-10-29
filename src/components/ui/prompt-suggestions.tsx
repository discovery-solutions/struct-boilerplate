interface PromptSuggestionsProps {
  label: string
  append: (message: { role: "User"; content: string }) => void
  suggestions: string[]
}

export function PromptSuggestions({
  label,
  append,
  suggestions,
}: PromptSuggestionsProps) {
  return (
    <div className="flex flex-col gap-6 p-4 mb-4">
      <h2 className="text-center text-2xl font-bold">{label}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 text-sm relative">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => append({ role: "User", content: suggestion })}
            className="flex h-full w-full items-center rounded-xl border bg-background p-2 md:p-4 hover:bg-muted"
          >
            <p>{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
