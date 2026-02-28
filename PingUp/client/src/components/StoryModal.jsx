import React, { useState } from 'react'
import { ArrowLeft, TextIcon, Upload, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

const StoryModal = ({ setShowModal, fetchStories }) => {

    const bgColors = ["#4f46e5", "#7c3aed", "#db2777", "#e11d48", "#ca8a04", "#0d9488"]

    const [mode, setMode] = useState("text")
    const [background, setBackground] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [PreviewUrl, setPreviewUrl] = useState(null)
    const [isCreating, setIsCreating] = useState(false)

    // Check if create button should be enabled
    const canCreateStory = () => {
        if (mode === 'text') {
            return text && text.trim() !== ''
        } else if (mode === 'media') {
            return media !== null
        }
        return false
    }

    const handleMediaChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleCreateStory = async () => {
        if (!canCreateStory()) {
            throw new Error('Please complete the story requirements')
        }
        
        setIsCreating(true)
        console.log('Creating story...', { mode, text: text?.length, media: media?.name })
        
        try {
            const formData = new FormData()
            
            if (mode === 'text') {
                if (!text || text.trim() === '') {
                    throw new Error('Please enter some text for your story')
                }
                formData.append('content', text)
                formData.append('media_type', 'text')
                formData.append('background_color', background)
            } else if (mode === 'media' && media) {
                formData.append('media', media)
                formData.append('media_type', media.type.startsWith('image') ? 'image' : 'video')
                formData.append('content', '')
            } else {
                throw new Error('Please select a photo or video')
            }
            
            console.log('Sending data to API...')
            
            // For demo purposes, simulate API call if endpoint doesn't exist
            try {
                const response = await fetch('/api/stories/create', {
                    method: 'POST',
                    body: formData
                })
                
                console.log('API response:', response.status)
                
                if (!response.ok) {
                    const errorData = await response.text()
                    console.error('API error:', errorData)
                    throw new Error('Failed to create story')
                }
                
                const newStory = await response.json()
                console.log('Story created:', newStory)
            } catch (fetchError) {
                console.log('API not available, simulating story creation...')
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000))
                
                // Create a mock story object
                const mockStory = {
                    _id: Date.now().toString(),
                    content: mode === 'text' ? text : '',
                    media_url: mode === 'media' && PreviewUrl ? PreviewUrl : '',
                    media_type: mode === 'text' ? 'text' : (media?.type.startsWith('image') ? 'image' : 'video'),
                    background_color: background,
                    createdAt: new Date().toISOString(),
                    user: {
                        profile_picture: '/sample_profile.jpg',
                        name: 'You'
                    }
                }
                
                console.log('Mock story created:', mockStory)
                
                // Reset form
                setText('')
                setMedia(null)
                setPreviewUrl(null)
                setMode('text')
                setBackground(bgColors[0])
                
                // Close modal and refresh stories
                setShowModal(false)
                if (fetchStories) {
                    fetchStories(mockStory)
                }
                
                return mockStory
            }
            
            // Reset form
            setText('')
            setMedia(null)
            setPreviewUrl(null)
            setMode('text')
            setBackground(bgColors[0])
            
            // Close modal and refresh stories
            setShowModal(false)
            if (fetchStories) {
                fetchStories(newStory)
            }
            
            return newStory
        } catch (error) {
            console.error('Create story error:', error)
            throw new Error(error.message || 'Failed to create story')
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur
        text-white flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-4 flex items-center justify-between'>
                    <button onClick={() => setShowModal(false)} className='text-white p-2 cursor-pointer'>
                        <ArrowLeft />
                    </button>
                    <h2 className='text-lg font-semibold'>Create Story</h2>
                    <span className="w-10"></span>
                </div>

                <div
                    className='rounded-lg h-96 flex items-center justify-center relative'
                    style={{ backgroundColor: background }}
                >
                    {mode === 'text' && (
                        <textarea
                            className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none'
                            placeholder="What's on your mind?"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                        />
                    )}

                    {mode === 'media' && PreviewUrl && (
                        media?.type.startsWith('image') ? (
                            <img
                                src={PreviewUrl}
                                alt=""
                                className='object-contain max-h-full'
                            />
                        ) : (
                            <video
                                src={PreviewUrl}
                                className='object-contain max-h-full'
                                controls
                            />
                        )
                    )}
                </div>

                <div className='flex mt-4 gap-2'>
                    {bgColors.map((color) => (
                        <button
                            key={color}
                            className='w-6 h-6 rounded-full ring cursor-pointer'
                            style={{ backgroundColor: color }}
                            onClick={() => setBackground(color)}
                        />
                    ))}
                </div>

                <div className='flex gap-2 mt-4'>
                    <button
                        onClick={() => { setMode('text'); setMedia(null); setPreviewUrl(null) }}
                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${
                            mode === 'text' ? 'bg-white text-black' : 'bg-zinc-800'
                        }`}
                    >
                        <TextIcon size={18} /> Text
                    </button>

                    <label
                        className={`flex-1 flex items-center justify-center gap-2
                        p-2 rounded cursor-pointer ${
                            mode === 'media' ? 'bg-white text-black' : 'bg-zinc-800'
                        }`}
                    >
                        <input
                            onChange={(e) => { handleMediaChange(e); setMode('media') }}
                            type="file"
                            accept="image/*,video/*"
                            className='hidden'
                        />
                        <Upload size={18} /> Photo/Video
                    </label>
                </div>

                <button
                    onClick={()=> {
                        if (!canCreateStory()) {
                            toast.error(mode === 'text' ? 'Please enter some text' : 'Please select a photo or video')
                            return
                        }
                        toast.promise(handleCreateStory(), {
                            loading: 'Saving...',
                            success: <p>Story Added</p>,
                            error: e => <p>{e.message}</p>
                        
                        })
                    }}
                    disabled={isCreating || !canCreateStory()}
                    className={`flex items-center justify-center gap-2 text-white
                    py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600
                    hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition
                    cursor-pointer ${(isCreating || !canCreateStory()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <Sparkles size={18} /> {isCreating ? 'Creating...' : 'Create Story'}
                </button>
            </div>
        </div>
    )
}

export default StoryModal
