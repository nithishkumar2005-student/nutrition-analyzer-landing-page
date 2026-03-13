import { Camera, Zap, TrendingUp, Mail, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HC</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Hill Calories</span>
          </div>
          <Link href="/analyze">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Analyze Meal</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Hero Content */}
          <div className="space-y-8 pt-4">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-950 dark:text-white leading-tight tracking-tight">
                Know Your{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Nutrients
                </span>{" "}
                Instantly
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg font-medium">
                Snap a photo of your meal and get instant macronutrient breakdown. Protein, carbs, fat—all in seconds.
                No sign-up. No ads. Just pure nutrition intelligence.
              </p>
            </div>

            {/* Value Props */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium">Instant Results</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium">100% Free & No Sign-Up</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium">AI-Powered Accuracy</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/analyze">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg px-8 py-7 rounded-xl h-auto w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                <Camera className="w-5 h-5 mr-2" />
                Start Analyzing Your Meal
              </Button>
            </Link>
          </div>

          {/* Right: Founder Card + Visual */}
          <div className="space-y-6">
            {/* Meal Photo Mockup */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 opacity-10" />
              <img
                src="/healthy-meal-plate-with-vegetables-and-protein.jpg"
                alt="Example meal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg">
                <p className="text-sm font-semibold text-slate-900">Grilled Salmon with Broccoli</p>
                <p className="text-xs text-slate-600 mt-1">45g Protein • 28g Carbs • 12g Fat</p>
              </div>
            </div>

            {/* Founder Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                  Meet Our Founder
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-4">
                  Building the future of nutrition technology
                </p>
              </div>

              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  PN
                </div>
              </div>

              {/* Info */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">P. Nithishkumar</h3>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">Founder & CEO</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Student at Mohan Babu University</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">(Expected Graduation: 2026)</p>
              </div>

              {/* Bio */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-center">
                Passionate about leveraging AI technology to make nutrition tracking accessible and accurate for
                everyone. Focused on building innovative solutions that bridge the gap between technology and healthy
                living.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <a
                  href="mailto:nitishkumar83411@gmail.com"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Contact via Email
                </a>
                <a
                  href="https://www.linkedin.com/in/pnithishkumar2005/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium rounded-lg transition-colors text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Three simple steps to unlock your nutrition insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:gap-6">
          {/* Step 1: Upload Photo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-lg h-full">
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center mb-6 mt-2">
                <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Upload Photo</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Upload or capture a meal photo from your device. Supports all common image formats including JPG, PNG,
                and WEBP for maximum compatibility.
              </p>
            </div>
          </div>

          {/* Step 2: AI Analysis */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-lg h-full">
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl flex items-center justify-center mb-6 mt-2">
                <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Analysis</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Our advanced computer vision and machine learning detect food items, estimate portions, and calculate
                nutritional values with state-of-the-art precision.
              </p>
            </div>
          </div>

          {/* Step 3: Get Results */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-lg h-full">
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
              </div>

              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl flex items-center justify-center mb-6 mt-2">
                <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Get Results</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Receive instant nutrition insights including calories, protein, carbs, fats, and a detailed
                macronutrient breakdown tailored to your meal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 sm:py-32 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Why Hill Calories?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Lightning-fast, accurate, and built with privacy at its core
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/30 rounded-xl flex items-center justify-center mb-5">
                <Camera className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Instant Results</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Get nutritional analysis in under 3 seconds with lightning-fast AI processing.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/30 rounded-xl flex items-center justify-center mb-5">
                <TrendingUp className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">High Accuracy</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                90%+ accuracy powered by state-of-the-art computer vision and machine learning.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/30 rounded-xl flex items-center justify-center mb-5">
                <svg
                  className="w-7 h-7 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Privacy First</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Your photos are processed securely and never stored permanently on our servers.
              </p>
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-2xl p-8 sm:p-12 border border-green-200 dark:border-slate-700 mb-16">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {/* Stat 1 */}
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  92%
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Accuracy Rate</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs">Powered by advanced ML</p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  3s
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Analysis Time</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs">Lightning-fast results</p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                  100%
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Secure</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs">No data storage</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <Link href="/analyze">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg px-8 py-6 rounded-xl h-auto shadow-lg hover:shadow-xl transition-all">
                <Camera className="w-5 h-5 mr-2" />
                Start Your Free Analysis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 sm:p-16 text-center space-y-8 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">Ready to Track Your Nutrition?</h2>
          <p className="text-lg sm:text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
            Start analyzing your meals today. It's free, fast, and takes just seconds. Join thousands optimizing their
            nutrition.
          </p>
          <Link href="/analyze">
            <Button className="bg-white hover:bg-green-50 text-green-600 hover:text-green-700 text-lg px-8 py-6 rounded-xl h-auto shadow-lg hover:shadow-xl transition-all font-semibold">
              <Camera className="w-5 h-5 mr-2" />
              Analyze Your First Meal
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 dark:text-slate-400">
          <p className="font-medium">Hill Calories AI</p>
          <p className="text-sm mt-2">Powered by vision AI • 2025</p>
        </div>
      </footer>
    </div>
  )
}
