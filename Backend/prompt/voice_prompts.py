from langchain_core.prompts import PromptTemplate

voice_command_prompt = PromptTemplate(
    input_variables=["command"],
    template="""
You are a Todo app assistant.

Analyze the voice command and return ONLY valid JSON.

Format:
{
  "intent": "add | complete | delete",
  "task_text": "string",
  "category": null,
  "due_date": null
}

Voice command:
{command}
"""
)
