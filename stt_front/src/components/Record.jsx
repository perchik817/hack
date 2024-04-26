import { useState } from "react";
import {api} from "../store/requests/api.js";

const SpeechToText = () => {
    const [recording, setRecording] = useState(false);
    const [result, setResult] = useState({});
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [stream, setStream] = useState(null); // Define stream state

    const stt = (audioBlob) => {
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.ogg");

        fetch(`${api}/lesson/speaking/1/compare_audio/`, {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Failed to receive data from API");
                }
                const response = await res.json();
                setResult({
                    isCorrect:response.is_correct,
                    recognizedText:response.recognized_text,
                    correctText:response.correct_text
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const startRecording = () => {
        // Check if stream is defined
        if (!stream) {
            console.error("Stream is not initialized.");
            return;
        }

        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = () => {};

        recorder.onstop = () => {
            const audioBlob = new Blob([], { type: "audio/ogg" });
            stt(audioBlob);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorder.stop();
        setRecording(false);
    };

    const getUserMedia = () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((userStream) => {
                setStream(userStream); // Set stream state
            })
            .catch((err) => {
                if (err.name === "NotAllowedError") {
                    console.log(
                        "User denied microphone access. Please grant permission to record audio."
                    );
                } else {
                    console.error("The following getUserMedia error occurred:", err);
                }
            });
    };

    // Call getUserMedia to initialize stream
    getUserMedia();

    return (
        <div className="container">
            <h1>Запишите свою речь</h1>
            <div id="result">{result.isCorrect ? "Verno" : "Neverno"}</div>
            <div id="result">Vy skazali {result.recognizedText}</div>
            <div id="result">A nado bylo {result.correctText}</div>

            <div className="btn_container">
                <button
                    id="startRecordingButton"
                    className="recordButton"
                    onClick={startRecording}
                    disabled={recording}
                >
                    Start Recording
                </button>
                <button
                    id="stopRecordingButton"
                    className="recordButton"
                    onClick={stopRecording}
                    disabled={!recording}
                >
                    Stop Recording
                </button>
            </div>
        </div>
    );
};

export default SpeechToText;
