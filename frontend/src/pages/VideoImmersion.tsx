import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Pause, Volume2, Maximize, ArrowLeft, 
    BookOpen, Layers, Film, Globe, MessageSquare, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useTTS } from '../hooks/useTTS';
import SmartText from '../components/SmartText';

interface Subtitle {
    start: number;
    end: number;
    text: string;
}

interface VideoEntry {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    category: 'Movies' | 'Business' | 'Grammar' | 'Daily Life';
    level: 'A1' | 'B2' | 'C1';
    subtitles: Subtitle[];
}

const VIDEO_CATALOG: VideoEntry[] = [
    {
        id: '1',
        title: 'Deep Ocean Exploration',
        description: 'Explore the mysteries of the deep sea while learning advanced descriptive adjectives.',
        thumbnail: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800',
        url: 'https://vjs.zencdn.net/v/oceans.mp4',
        category: 'Movies',
        level: 'B2',
        subtitles: [
            { start: 0, end: 5, text: "The ocean is a vast and mysterious place, full of life." },
            { start: 5, end: 12, text: "For centuries, humans have wondered what lies beneath the deep blue waves." },
            { start: 12, end: 18, text: "Today, new technology allows us to dive deeper than ever before." },
            { start: 18, end: 25, text: "We will discover creatures that seem like they come from another planet." }
        ]
    },
    {
        id: '2',
        title: 'Cinematic Narrative: Sintel',
        description: 'Analyze storytelling structures and emotional vocabulary in this epic saga.',
        thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800',
        url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        category: 'Movies',
        level: 'C1',
        subtitles: [
            { start: 0, end: 5, text: "In a world lost to time, one warrior seeks her destiny." },
            { start: 5, end: 10, text: "Friendship and betrayal are two sides of the same coin." }
        ]
    },
    {
        id: '3',
        title: 'Eco-System Biodiversity',
        description: 'Understand environmental English while observing global habitats.',
        thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        category: 'Grammar',
        level: 'A1',
        subtitles: [
            { start: 0, end: 3, text: "Nature is beautiful and diverse." },
            { start: 3, end: 6, text: "Flowers grow in spring when it rains." }
        ]
    }
];

const VideoImmersion: React.FC = () => {
    // Estados de control de la experiencia de inmersión
    const [selectedVideo, setSelectedVideo] = useState<VideoEntry | null>(null); // Video activo
    const [isPlaying, setIsPlaying] = useState(false); // Estado del reproductor
    const [currentTime, setCurrentTime] = useState(0); // Tiempo actual
    const [activeSub, setActiveSub] = useState<Subtitle | null>(null); // Subtítulo activo en pantalla
    const [hasError, setHasError] = useState(false); // Gestión de errores de carga multimedia
    
    // Referencia al elemento HTML5 Video nativo
    const videoRef = useRef<HTMLVideoElement>(null);
    
    // Hook personalizado para síntesis de voz (Text-to-Speech)
    const { speak } = useTTS();

    /**
     * useEffect: Sincroniza los subtítulos con el tiempo real de reproducción.
     * Escucha el evento 'timeupdate' del video y busca el match en el catálogo.
     */
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !selectedVideo) return;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            const sub = selectedVideo.subtitles.find(s => video.currentTime >= s.start && video.currentTime <= s.end);
            setActiveSub(sub || null);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }, [selectedVideo]);

    /**
     * togglePlay: Controla el flujo de reproducción.
     * Implementa manejo defensivo de promesas para navegadores con autoplay restringido.
     */
    const togglePlay = async () => {
        if (videoRef.current) {
            try {
                if (isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                } else {
                    await videoRef.current.play();
                    setIsPlaying(true);
                }
            } catch (error) {
                toast.error("Format not supported or network error.");
            }
        }
    };

    /**
     * handleSeek: Navegación de precisión por la línea de tiempo.
     */
    const handleSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    if (!selectedVideo) {
        return (
            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '10rem' }}>
                <header style={{ marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <Link to="/lessons" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold' }}>
                            <ArrowLeft size={18} /> BACK TO LESSONS
                        </Link>
                        <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '800' }}>
                           MASTER AUDITORY COMPREHENSION
                        </div>
                    </div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px' }}>
                        Immersive <span className="gradient-text">Studio.</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>
                        Choose a cinematic experience to practice with interactive smart subtitles.
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
                    {VIDEO_CATALOG.map(video => (
                        <motion.div 
                            key={video.id}
                            whileHover={{ y: -10 }}
                            className="glass-card"
                            style={{ overflow: 'hidden', cursor: 'pointer' }}
                            onClick={() => setSelectedVideo(video)}
                        >
                            <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                                <img src={video.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={video.title} />
                                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '0.3rem 0.8rem', borderRadius: '8px', fontWeight: 'bold' }}>{video.category}</span>
                                    <span style={{ background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '0.7rem', padding: '0.3rem 0.8rem', borderRadius: '8px', fontWeight: 'bold', backdropFilter: 'blur(5px)' }}>{video.level}</span>
                                </div>
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }} className="hover-play">
                                    <Play size={48} color="white" />
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: '800' }}>{video.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>{video.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Layers size={14} /> {video.subtitles.length} SMART SUBTITLES
                                    </span>
                                    <ChevronRight size={18} color="var(--primary)" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '10rem' }}>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => { setSelectedVideo(null); setIsPlaying(false); setHasError(false); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '1rem' }}>
                    <ArrowLeft size={18} /> BACK TO STUDIO
                </button>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {selectedVideo.category}
                    </div>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        LEVEL {selectedVideo.level}
                    </div>
                </div>
            </header>

            <div className="glass-card" style={{ padding: '1rem', overflow: 'hidden', position: 'relative', marginBottom: '3rem' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '24px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {hasError ? (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                            <Film size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>Video loading failed.<br/>Try another title in the catalog.</p>
                        </div>
                    ) : (
                        <video 
                            ref={videoRef}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            src={selectedVideo.url}
                            onClick={togglePlay}
                            onError={() => setHasError(true)}
                        />
                    )}

                    <AnimatePresence>
                        {activeSub && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                style={{ position: 'absolute', bottom: '15%', left: '10%', right: '10%', textAlign: 'center', zIndex: 10 }}
                            >
                                <span style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', padding: '0.8rem 1.6rem', borderRadius: '14px', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)', display: 'inline-block', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                                   <SmartText>{activeSub.text}</SmartText>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <button onClick={togglePlay} style={{ background: 'var(--primary)', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px var(--primary-glow)' }}>
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', cursor: 'pointer', position: 'relative' }}>
                            <div style={{ width: `${(currentTime / (videoRef.current?.duration || 1)) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: '2px' }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>{Math.floor(currentTime)}s</span>
                        <Maximize size={18} color="white" style={{ cursor: 'pointer', opacity: 0.7 }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2.5rem' }}>
                <div>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><BookOpen size={20} color="var(--primary)" /> Smart Transcript</h3>
                    <div className="glass-card" style={{ padding: '1.5rem', display: 'grid', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
                        {selectedVideo.subtitles.map((sub, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ x: 5 }}
                                onClick={() => handleSeek(sub.start)}
                                style={{ 
                                    display: 'flex', gap: '1.25rem', cursor: 'pointer', padding: '1rem', 
                                    borderRadius: '12px', background: activeSub === sub ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                    border: `1px solid ${activeSub === sub ? 'var(--primary)' : 'transparent'}`,
                                    alignItems: 'center'
                                }}
                            >
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 'bold', minWidth: '40px' }}>{Math.floor(sub.start/60)}:{sub.start%60 < 10 ? `0${sub.start%60}` : sub.start%60}</span>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '1rem', color: activeSub === sub ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                        <SmartText>{sub.text}</SmartText>
                                    </p>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); speak(sub.text); }}
                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    className="hover-glow"
                                >
                                    <Volume2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '2rem', alignContent: 'start' }}>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={18} color="var(--accent)" /> AI Context</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            This content is curated to match your {selectedVideo.level} vocabulary profile. 
                            Hover over underscored words for instant contextual Spanish translation.
                        </p>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem', background: 'rgba(99,102,241,0.03)' }}>
                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MessageSquare size={18} color="var(--primary)" /> Study Goals</h4>
                        <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'grid', gap: '0.5rem' }}>
                            <li>Understand the main thesis</li>
                            <li>Extract 3 technical nouns</li>
                            <li>Master connected speech</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoImmersion;
