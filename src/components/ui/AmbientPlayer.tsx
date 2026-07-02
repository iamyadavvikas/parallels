"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";

interface Track {
  id: string;
  name: string;
  tradition: string;
  frequency: string;
}

const tracks: Track[] = [
  { id: "meditation", name: "Meditation", tradition: "Buddhism", frequency: "432 Hz" },
  { id: "chanting", name: "Sacred Chant", tradition: "Hinduism", frequency: "528 Hz" },
  { id: "hymn", name: "Contemplation", tradition: "Christianity", frequency: "396 Hz" },
  { id: "call", name: "Reflection", tradition: "Islam", frequency: "639 Hz" },
  { id: "ambient", name: "Universal", tradition: "All Traditions", frequency: "741 Hz" },
];

export default function AmbientPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const frequencies: Record<string, number> = {
    meditation: 432,
    chanting: 528,
    hymn: 396,
    call: 639,
    ambient: 741,
  };

  function startAudio() {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;

    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequencies[currentTrack.id] || 432, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume * 0.15, ctx.currentTime + 2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscillatorRef.current = osc;
    gainRef.current = gain;
    setPlaying(true);
  }

  function stopAudio() {
    if (gainRef.current && audioContextRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1);
      setTimeout(() => {
        oscillatorRef.current?.stop();
        oscillatorRef.current = null;
      }, 1000);
    }
    setPlaying(false);
  }

  function togglePlay() {
    if (playing) {
      stopAudio();
    } else {
      startAudio();
    }
  }

  function changeTrack(track: Track) {
    setCurrentTrack(track);
    if (playing) {
      stopAudio();
      setTimeout(() => {
        setCurrentTrack(track);
        startAudio();
      }, 500);
    }
  }

  useEffect(() => {
    if (gainRef.current && audioContextRef.current) {
      gainRef.current.gain.setValueAtTime(volume * 0.15, audioContextRef.current.currentTime);
    }
  }, [volume, currentTrack]);

  useEffect(() => {
    return () => {
      oscillatorRef.current?.stop();
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-8">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={playing ? "Pause ambient sound" : "Play ambient sound"}
        aria-expanded={isOpen}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-obsidian/90 backdrop-blur-xl text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
        style={{
          boxShadow: playing
            ? "0 0 20px rgba(201,168,76,0.2), 0 4px 20px var(--color-shadow-md)"
            : "0 4px 20px var(--color-shadow-md)",
        }}
      >
        {playing ? (
          <Music className="h-5 w-5 animate-pulse text-accent" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 rounded-2xl border border-border bg-obsidian/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-text-muted">
                Ambient Sound
              </h3>
              <span className="text-[10px] text-text-muted/50 font-mono">
                {currentTrack.frequency}
              </span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVolume(0)}
                aria-label="Mute"
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <VolumeX className="h-4 w-4" />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume"
                className="flex-1 h-1 bg-border rounded-full appearance-none cursor-pointer accent-accent"
              />
              <button
                onClick={() => setVolume(1)}
                aria-label="Maximum volume"
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Track list */}
          <div className="p-2 max-h-60 overflow-y-auto">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => changeTrack(track)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  currentTrack.id === track.id
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                }`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  currentTrack.id === track.id ? "bg-accent/20" : "bg-bg-secondary"
                }`}>
                  <span className="text-xs">♫</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate font-body">{track.name}</p>
                  <p className="text-xs text-text-muted truncate font-body">{track.tradition}</p>
                </div>
                {currentTrack.id === track.id && playing && (
                  <div className="flex items-center gap-0.5">
                    <span className="h-3 w-0.5 bg-accent animate-pulse" />
                    <span className="h-4 w-0.5 bg-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <span className="h-2 w-0.5 bg-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Play/Pause */}
          <div className="p-3 border-t border-border">
            <button
              onClick={togglePlay}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all duration-300 border border-accent/30 text-accent hover:bg-accent/10"
            >
              {playing ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Play
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
