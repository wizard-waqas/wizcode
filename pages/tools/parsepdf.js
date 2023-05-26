import React, {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ParsepdfPage() {
    const [fileData, setFileData] = useState("");

    return (
        <div className={"flex flex-col items-center"}>
            <h1 className={"text-4xl text-gold my-4"}>PDF Summarizer</h1>
            <FileUploadInput setFileData={setFileData} />
            {fileData && <FileDataDisplay fileData={fileData} />}
        </div>
    )

}

const FileDataDisplay = ({fileData}) => {
    return (
        <div className={"mt-10"}>
            <h1 className={"text-2xl text-center"}>Summarized Data</h1>
            <p className={"mt-2"}>
                {fileData}
            </p>
        </div>
    )
}

const FileUploadInput = ({setFileData}) => {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const toastIDParseFile = toast.loading("Parsing & summarizing file...");

        try {
            let formData = new FormData();
            formData.append("file", file);
            const pdfDataResponse = await axios.post(`https://trivvi-6a057.uc.r.appspot.com/api/parsepdf`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });
            const pdfData = pdfDataResponse.data;

            const summarizedResponse = await axios.post("https://trivvi-6a057.uc.r.appspot.com/api/ai-generate/summarize", {
                textData: pdfData
            });
            const summarizedText = summarizedResponse.data;

            setFileData(summarizedText);
            toast.dismiss(toastIDParseFile);
            toast.success("Successfully parsed file");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
                <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                    />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
                    >
                        <span className={"text-gold"}>Upload a file</span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                        />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PDF files only</p>
            </div>
        </div>
    );
}