"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Upload, Camera, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MealUploaderProps {
  onAnalyze: (imageData: string) => void
  loading: boolean
}

export function MealUploader({ onAnalyze, loading }: MealUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [mode, setMode] = useState<"select" | "camera">("select")
  const [cameraActive, setCameraActive] = useState(false)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      setPreview(imageData)
      setMode("select")
    }
    reader.readAsDataURL(file)
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setMode("camera")
      }
    } catch (error) {
      console.error("Camera error:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const context = canvasRef.current.getContext("2d")
    if (!context) return

    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    context.drawImage(videoRef.current, 0, 0)

    const imageData = canvasRef.current.toDataURL("image/jpeg", 0.9)
    setPreview(imageData)
    stopCamera()
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setCameraActive(false)
    }
  }

  const handleAnalyze = () => {
    if (!preview) return
    onAnalyze(preview)
  }

  const resetUpload = () => {
    setPreview(null)
    setMode("select")
    setCameraActive(false)
    stopCamera()
  }

  if (cameraActive && mode === "camera") {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video shadow-lg">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        </div>
        <canvas ref={canvasRef} className="hidden" />

        <div className="flex gap-4">
          <Button
            onClick={capturePhoto}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl font-semibold"
          >
            <Camera className="w-5 h-5 mr-2" />
            Capture Photo
          </Button>
          <Button
            onClick={() => {
              stopCamera()
              setMode("select")
            }}
            variant="outline"
            className="flex-1 py-6 rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  if (preview && mode === "select") {
    return (
      <div className="space-y-6">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden aspect-video shadow-lg">
          <img src={preview || "/placeholder.svg"} alt="Meal preview" className="w-full h-full object-contain" />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Meal"}
            {!loading && <ChevronRight className="w-5 h-5 ml-2" />}
          </Button>
          <Button onClick={resetUpload} variant="outline" className="flex-1 py-6 rounded-xl bg-transparent">
            Try Another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-green-400 dark:hover:border-green-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-green-50/50 dark:hover:bg-slate-700/50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Upload className="w-8 h-8 text-slate-400 group-hover:text-green-600 mb-3 transition-colors" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Upload Photo</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">or drag & drop</span>
        </button>

        {/* Camera Button */}
        <button
          onClick={startCamera}
          className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-orange-50/50 dark:hover:bg-slate-700/50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Camera className="w-8 h-8 text-slate-400 group-hover:text-orange-500 mb-3 transition-colors" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">Take Photo</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2">use camera</span>
        </button>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {/* Microcopy */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-300 font-medium">
          💡 Pro Tip: Use clear photos with good lighting. Include the entire meal and serving size for best results.
        </p>
      </div>
    </div>
  )
}
