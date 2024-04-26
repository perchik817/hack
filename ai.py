from gradio_client import Client

client = Client("https://the-cramer-project-akylai-tts-mini.hf.space/")
result = client.predict(
    "ˈeɪtʃ ˈəʊ dˈʌbəljˌuː dˈiː wˈaɪ",  # IPA transcription
    api_name="/AkylAI TTS Mini"
)
print(result)  # Synthesized audio