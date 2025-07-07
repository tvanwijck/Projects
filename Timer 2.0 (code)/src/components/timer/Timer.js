import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuth } from '../../contexts/AuthContext';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimeEntries from './TimeEntries';
import Header from './Header';
import CustomDialog from '../common/CustomDialog';
import SpreadsheetDialog from '../common/SpreadsheetDialog';
import clipboardCopiedIcon from '../../Assets/clipboard_copied.png';
import './Timer.css';

const Timer = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [timerState, setTimerState] = useState({
    isRunning: false,
    isPaused: false,
    elapsedTime: 0,
    startTime: null
  });
  const [currentEntry, setCurrentEntry] = useState({
    project: '',
    description: ''
  });
  const [projectError, setProjectError] = useState('');
  const [projectErrorFading, setProjectErrorFading] = useState(false);
  const [timeEntries, setTimeEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});
  const [showSpreadsheet, setShowSpreadsheet] = useState(false);
  const [spreadsheetEntries, setSpreadsheetEntries] = useState([]);
  const [monkeyContainer, setMonkeyContainer] = useState([]);
  const [monkeyTimeText, setMonkeyTimeText] = useState(false);
  const [monkeyTimeMode, setMonkeyTimeMode] = useState(false);
  const [showSaveErrorToast, setShowSaveErrorToast] = useState(false);
  const [saveErrorToastFading, setSaveErrorToastFading] = useState(false);
  const [showDeleteErrorToast, setShowDeleteErrorToast] = useState(false);
  const [deleteErrorToastFading, setDeleteErrorToastFading] = useState(false);
  const [showCopyErrorToast, setShowCopyErrorToast] = useState(false);
  const [copyErrorToastFading, setCopyErrorToastFading] = useState(false);
  const [showNoEntriesToast, setShowNoEntriesToast] = useState(false);
  const [noEntriesToastFading, setNoEntriesToastFading] = useState(false);
  const [showCopyAllErrorToast, setShowCopyAllErrorToast] = useState(false);
  const [copyAllErrorToastFading, setCopyAllErrorToastFading] = useState(false);
  const [showSpreadsheetCopyErrorToast, setShowSpreadsheetCopyErrorToast] = useState(false);
  const [spreadsheetCopyErrorToastFading, setSpreadsheetCopyErrorToastFading] = useState(false);
  const intervalRef = useRef(null);
  const quillRef = useRef(null);
  const errorTimeoutRef = useRef(null);

  // Auto-update monkey time mode based on monkey presence
  useEffect(() => {
    if (monkeyContainer.length > 0 && !monkeyTimeMode) {
      setMonkeyTimeMode(true);
    } else if (monkeyContainer.length === 0 && monkeyTimeMode) {
      setMonkeyTimeMode(false);
    }
  }, [monkeyContainer.length, monkeyTimeMode]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Timer logic
  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          elapsedTime: (Date.now() - prev.startTime) / 1000
        }));
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.isPaused, timerState.startTime]);

  // Keyboard and mouse interaction effects
  useEffect(() => {
    if (monkeyContainer.length === 0) return;

    const handleKeyPress = (e) => {
      // ESC key exits Monkey Time mode
      if (e.code === 'Escape') {
        e.preventDefault();
        clearMonkeys();
        return;
      }
      
      // Spacebar creates more monkeys
      if (e.code === 'Space') {
        e.preventDefault();
        spawnMonkey();
      }
      
      // Arrow keys control all monkeys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
        setMonkeyContainer(prev => prev.map(monkey => {
          if (monkey.id && monkey.id.toString().includes('banana')) {
            return monkey;
          }
          
          const speed = 5;
          let newVelocityX = monkey.velocity?.x || 0;
          let newVelocityY = monkey.velocity?.y || 0;
          
          switch (e.code) {
            case 'ArrowUp':
              newVelocityY -= speed;
              break;
            case 'ArrowDown':
              newVelocityY += speed;
              break;
            case 'ArrowLeft':
              newVelocityX -= speed;
              break;
            case 'ArrowRight':
              newVelocityX += speed;
              break;
            default:
              break;
          }
          
          return {
            ...monkey,
            velocity: {
              ...monkey.velocity,
              x: newVelocityX,
              y: newVelocityY
            }
          };
        }));
      }
    };

    const handleMouseMove = (e) => {
      // Monkeys are attracted to mouse cursor
      setMonkeyContainer(prev => prev.map(monkey => {
        if (monkey.id && monkey.id.toString().includes('banana')) {
          return monkey;
        }
        
        const dx = e.clientX - monkey.x;
        const dy = e.clientY - monkey.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const attraction = 0.5;
          const newVelocityX = (monkey.velocity?.x || 0) + (dx / distance) * attraction;
          const newVelocityY = (monkey.velocity?.y || 0) + (dy / distance) * attraction;
          
          return {
            ...monkey,
            velocity: {
              ...monkey.velocity,
              x: newVelocityX,
              y: newVelocityY
            }
          };
        }
        
        return monkey;
      }));
    };

    const handleClick = (e) => {
      // Click creates explosion effect at cursor
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(particle);
        
        const angle = (i / particleCount) * 360;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle * Math.PI / 180) * velocity;
        const vy = Math.sin(angle * Math.PI / 180) * velocity;
        
        let opacity = 1;
        let scale = 1;
        const animate = () => {
          const currentLeft = parseFloat(particle.style.left);
          const currentTop = parseFloat(particle.style.top);
          
          particle.style.left = (currentLeft + vx * 0.1) + 'px';
          particle.style.top = (currentTop + vy * 0.1) + 'px';
          particle.style.opacity = opacity;
          particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
          
          opacity -= 0.03;
          scale -= 0.02;
          
          if (opacity > 0) {
            requestAnimationFrame(animate);
          } else {
            if (document.body.contains(particle)) {
              document.body.removeChild(particle);
            }
          }
        };
        
        requestAnimationFrame(animate);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [monkeyContainer.length]);

  // Physics animation for monkeys
  useEffect(() => {
    if (monkeyContainer.length === 0) return;

    const animateMonkeys = () => {
      setMonkeyContainer(prev => prev.map(monkey => {
        // Skip bananas as they have their own animation
        if (monkey.id && monkey.id.toString().includes('banana')) {
          return monkey;
        }

        // Apply physics
        const newX = monkey.x + (monkey.velocity?.x || 0);
        const newY = monkey.y + (monkey.velocity?.y || 0);
        const newRotation = (monkey.rotation || 0) + (monkey.velocity?.rotation || 0);

        // Bounce off screen edges
        let newVelocityX = monkey.velocity?.x || 0;
        let newVelocityY = monkey.velocity?.y || 0;

        if (newX <= 0 || newX >= window.innerWidth - 100) {
          newVelocityX = -newVelocityX * 0.8; // Bounce with energy loss
        }
        if (newY <= 0 || newY >= window.innerHeight - 100) {
          newVelocityY = -newVelocityY * 0.8; // Bounce with energy loss
        }

        // Add some gravity and air resistance
        newVelocityY += 0.2; // Gravity
        newVelocityX *= 0.99; // Air resistance
        newVelocityY *= 0.99; // Air resistance

        return {
          ...monkey,
          x: Math.max(0, Math.min(window.innerWidth - 100, newX)),
          y: Math.max(0, Math.min(window.innerHeight - 100, newY)),
          rotation: newRotation,
          velocity: {
            x: newVelocityX,
            y: newVelocityY,
            rotation: monkey.velocity?.rotation || 0
          }
        };
      }));
    };

    const animationId = requestAnimationFrame(animateMonkeys);
    const interval = setInterval(animateMonkeys, 16); // ~60fps

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(interval);
    };
  }, [monkeyContainer.length]);

  // Auto-clear project error after 10 seconds
  useEffect(() => {
    if (projectError) {
      // Clear any existing timeout
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      
      // Reset fading state
      setProjectErrorFading(false);
      
      // Start fade-out after 8 seconds (2 seconds before removal)
      const fadeTimeout = setTimeout(() => {
        setProjectErrorFading(true);
      }, 8000);
      
      // Remove error completely after 10 seconds
      errorTimeoutRef.current = setTimeout(() => {
        setProjectError('');
        setProjectErrorFading(false);
      }, 10000);

      // Cleanup fade timeout
      return () => {
        clearTimeout(fadeTimeout);
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
      };
    }

    // Cleanup timeout on unmount
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [projectError]);

  // Auto-dismiss save error toast
  useEffect(() => {
    if (showSaveErrorToast) {
      // Reset fading state
      setSaveErrorToastFading(false);
      
      // Start fade-out after 6 seconds (2 seconds before removal)
      const fadeTimeout = setTimeout(() => {
        setSaveErrorToastFading(true);
      }, 6000);
      
      // Remove toast completely after 8 seconds
      const removeTimeout = setTimeout(() => {
        setShowSaveErrorToast(false);
        setSaveErrorToastFading(false);
      }, 8000);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [showSaveErrorToast]);

  // Auto-dismiss delete error toast
  useEffect(() => {
    if (showDeleteErrorToast) {
      // Reset fading state
      setDeleteErrorToastFading(false);
      
      // Start fade-out after 6 seconds (2 seconds before removal)
      const fadeTimeout = setTimeout(() => {
        setDeleteErrorToastFading(true);
      }, 6000);
      
      // Remove toast completely after 8 seconds
      const removeTimeout = setTimeout(() => {
        setShowDeleteErrorToast(false);
        setDeleteErrorToastFading(false);
      }, 8000);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [showDeleteErrorToast]);

  // Auto-dismiss copy error toast
  useEffect(() => {
    if (showCopyErrorToast) {
      // Reset fading state
      setCopyErrorToastFading(false);
      
      // Start fade-out after 6 seconds (2 seconds before removal)
      const fadeTimeout = setTimeout(() => {
        setCopyErrorToastFading(true);
      }, 6000);
      
      // Remove toast completely after 8 seconds
      const removeTimeout = setTimeout(() => {
        setShowCopyErrorToast(false);
        setCopyErrorToastFading(false);
      }, 8000);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [showCopyErrorToast]);

  // Auto-dismiss no entries toast
  useEffect(() => {
    if (showNoEntriesToast) {
      // Reset fading state
      setNoEntriesToastFading(false);
      
      // Start fade-out after 6 seconds (2 seconds before removal)
      const fadeTimeout = setTimeout(() => {
        setNoEntriesToastFading(true);
      }, 6000);
      
      // Remove toast completely after 8 seconds
      const removeTimeout = setTimeout(() => {
        setShowNoEntriesToast(false);
        setNoEntriesToastFading(false);
      }, 8000);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [showNoEntriesToast]);

  // Auto-dismiss copy all error toast
  useEffect(() => {
    if (showCopyAllErrorToast) {
      setCopyAllErrorToastFading(false);
      const fadeTimeout = setTimeout(() => {
        setCopyAllErrorToastFading(true);
      }, 6000);
      const removeTimeout = setTimeout(() => {
        setShowCopyAllErrorToast(false);
        setCopyAllErrorToastFading(false);
      }, 8000);
      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [showCopyAllErrorToast]);

  // Auto-dismiss spreadsheet copy error toast
  useEffect(() => {
    if (showSpreadsheetCopyErrorToast) {
      setSpreadsheetCopyErrorToastFading(false);
      const fadeTimeout = setTimeout(() => {
        setSpreadsheetCopyErrorToastFading(true);
      }, 6000);
      const removeTimeout = setTimeout(() => {
        setShowSpreadsheetCopyErrorToast(false);
        setSpreadsheetCopyErrorToastFading(false);
      }, 8000);
      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [showSpreadsheetCopyErrorToast]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const spawnMonkey = () => {
    // Create a wild monkey frenzy!
    const monkeyEmojis = ['🙈', '🙉', '🙊', '🐵', '🦧', '🐒', '🦍'];
    const otherFunEmojis = ['🐨', '🐯', '🦁', '🐸', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🐘', '🦛', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🐁', '🐀', '🐿️', '🦔', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌻', '🌼', '🌸'];
    
    // Create multiple monkeys with different behaviors
    const numMonkeys = Math.floor(Math.random() * 15) + 10; // 10-25 monkeys!
    
    for (let i = 0; i < numMonkeys; i++) {
      setTimeout(() => {
        // 50% chance for monkey, 50% chance for other fun emoji
        const isMonkey = Math.random() < 0.5;
        const emojiArray = isMonkey ? monkeyEmojis : otherFunEmojis;
        const randomEmoji = emojiArray[Math.floor(Math.random() * emojiArray.length)];
        
        const newMonkey = {
          id: Date.now() + i + Math.random(),
          emoji: randomEmoji,
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100),
          size: Math.random() * 3 + 1, // Random size between 1-4
          rotation: Math.random() * 360,
          velocity: {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
            rotation: (Math.random() - 0.5) * 20
          },
          type: Math.floor(Math.random() * 5), // Different animation types
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          glow: Math.random() > 0.5,
          bounce: Math.random() > 0.7,
          trail: Math.random() > 0.8
        };
        
        setMonkeyContainer(prev => [...prev, newMonkey]);
        
        // Remove monkey after random time
        setTimeout(() => {
          setMonkeyContainer(prev => prev.filter(m => m.id !== newMonkey.id));
        }, Math.random() * 4000 + 3000); // 3-7 seconds
      }, i * 50); // Stagger the spawns
    }
    
    // Show the wild text
    setMonkeyTimeText(true);
    setMonkeyTimeMode(true);
    
    // Create screen shake effect
    const originalTransform = document.body.style.transform;
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
      const shakeX = (Math.random() - 0.5) * 20;
      const shakeY = (Math.random() - 0.5) * 20;
      const shakeRotate = (Math.random() - 0.5) * 2;
      document.body.style.transform = `translate(${shakeX}px, ${shakeY}px) rotate(${shakeRotate}deg)`;
      
      shakeCount++;
      if (shakeCount > 20) {
        clearInterval(shakeInterval);
        document.body.style.transform = originalTransform;
      }
    }, 50);
    
    // Create color flash effect
    const originalBackground = document.body.style.backgroundColor;
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.style.backgroundColor = randomColor;
      
      flashCount++;
      if (flashCount > 10) {
        clearInterval(flashInterval);
        document.body.style.backgroundColor = originalBackground;
      }
    }, 200);
    
    // Create particle explosion effect
    const createParticles = () => {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(particle);
        
        const angle = (i / particleCount) * 360;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle * Math.PI / 180) * velocity;
        const vy = Math.sin(angle * Math.PI / 180) * velocity;
        
        let opacity = 1;
        let scale = 1;
        const animate = () => {
          const currentLeft = parseFloat(particle.style.left);
          const currentTop = parseFloat(particle.style.top);
          
          particle.style.left = (currentLeft + vx * 0.1) + 'px';
          particle.style.top = (currentTop + vy * 0.1) + 'px';
          particle.style.opacity = opacity;
          particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
          
          opacity -= 0.02;
          scale -= 0.01;
          
          if (opacity > 0) {
            requestAnimationFrame(animate);
          } else {
            document.body.removeChild(particle);
          }
        };
        
        requestAnimationFrame(animate);
      }
    };
    
    createParticles();
    
    // Create floating bananas
    const createBananas = () => {
      const bananaCount = 8;
      for (let i = 0; i < bananaCount; i++) {
        setTimeout(() => {
          const banana = {
            id: `banana-${Date.now()}-${i}`,
            emoji: '🍌',
            x: Math.random() * (window.innerWidth - 50),
            y: -50,
            velocity: {
              x: (Math.random() - 0.5) * 4,
              y: 2 + Math.random() * 3,
              rotation: (Math.random() - 0.5) * 10
            },
            rotation: 0
          };
          
          setMonkeyContainer(prev => [...prev, banana]);
          
          // Animate banana falling
          const animateBanana = () => {
            setMonkeyContainer(prev => prev.map(b => {
              if (b.id === banana.id) {
                return {
                  ...b,
                  x: b.x + b.velocity.x,
                  y: b.y + b.velocity.y,
                  rotation: b.rotation + b.velocity.rotation
                };
              }
              return b;
            }));
            
            if (banana.y < window.innerHeight + 50) {
              requestAnimationFrame(animateBanana);
            } else {
              setMonkeyContainer(prev => prev.filter(b => b.id !== banana.id));
            }
          };
          
          requestAnimationFrame(animateBanana);
        }, i * 300);
      }
    };
    
    createBananas();
    
    // Create rainbow trail effect
    const createRainbowTrail = () => {
      const trail = document.createElement('div');
      trail.style.position = 'fixed';
      trail.style.top = '0';
      trail.style.left = '0';
      trail.style.width = '100%';
      trail.style.height = '100%';
      trail.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff)';
      trail.style.backgroundSize = '400% 400%';
      trail.style.opacity = '0.3';
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = '9998';
      trail.style.animation = 'rainbowMove 2s ease-in-out';
      
      document.body.appendChild(trail);
      
      setTimeout(() => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      }, 2000);
    };
    
    createRainbowTrail();
    
    // Hide text after wild duration
    setTimeout(() => {
      setMonkeyTimeText(false);
    }, 4000);
    
    // Play monkey sounds (if available)
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("It's Monkey Time! 🐒");
      utterance.rate = 1.5;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const clearMonkeys = () => {
    // Revert all visual effects back to normal
    document.body.style.transform = '';
    document.body.style.backgroundColor = '';
    
    // Create exit explosion effect
    const exitParticleCount = 30;
    for (let i = 0; i < exitParticleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.transform = 'translate(-50%, -50%)';
      
      document.body.appendChild(particle);
      
      const angle = (i / exitParticleCount) * 360;
      const velocity = 150 + Math.random() * 100;
      const vx = Math.cos(angle * Math.PI / 180) * velocity;
      const vy = Math.sin(angle * Math.PI / 180) * velocity;
      
      let opacity = 1;
      let scale = 1;
      const animate = () => {
        const currentLeft = parseFloat(particle.style.left);
        const currentTop = parseFloat(particle.style.top);
        
        particle.style.left = (currentLeft + vx * 0.1) + 'px';
        particle.style.top = (currentTop + vy * 0.1) + 'px';
        particle.style.opacity = opacity;
        particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        opacity -= 0.04;
        scale -= 0.02;
        
        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          if (document.body.contains(particle)) {
            document.body.removeChild(particle);
          }
        }
      };
      
      requestAnimationFrame(animate);
    }
    
    // Play exit sound
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("Monkey time is over! Back to work!");
      utterance.rate = 1.2;
      utterance.pitch = 0.8;
      speechSynthesis.speak(utterance);
    }
    
    setMonkeyContainer([]);
    setMonkeyTimeText(false);
  };

  const startTimer = () => {
    const now = Date.now();
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      startTime: prev.isPaused ? now - (prev.elapsedTime * 1000) : now,
      elapsedTime: prev.isPaused ? prev.elapsedTime : 0
    }));
  };

  const pauseTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isPaused: true
    }));
  };

  const stopTimer = async () => {
    // Immediately pause the timer when Stop is pressed
    setTimerState(prev => ({
      ...prev,
      isPaused: true
    }));

    if (timerState.elapsedTime > 0) {
      setDialogConfig({
        title: 'Save Time Entry',
        message: 'Do you want to save this time entry?',
        buttons: [
          {
            type: 'reset',
            text: 'Cancel recording',
            onClick: () => resetTimer()
          },
          {
            type: 'cancel',
            text: 'Continue recording',
            onClick: () => {
              const now = Date.now();
              setTimerState(prev => ({
                ...prev,
                isPaused: false,
                startTime: now - (prev.elapsedTime * 1000)
              }));
            }
          },
          {
            type: 'confirm',
            text: 'Save',
            onClick: () => saveTimeEntry()
          }
        ]
      });
      setShowDialog(true);
    } else {
      resetTimer();
    }
  };

  const resetTimer = () => {
    setTimerState({
      isRunning: false,
      isPaused: false,
      elapsedTime: 0,
      startTime: null
    });
    setCurrentEntry({
      project: '',
      description: ''
    });
    if (quillRef.current) {
      quillRef.current.getEditor().setContents([]);
    }
  };

  const saveTimeEntry = async () => {
    if (!currentEntry.project.trim()) {
      setProjectError('Please enter a project name');
      return;
    }

    setLoading(true);
    try {
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - (timerState.elapsedTime * 1000));
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/time-entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          project: currentEntry.project,
          description: currentEntry.description,
          duration: Math.floor(timerState.elapsedTime),
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString()
        })
      });

      if (response.ok) {
        const newEntry = await response.json();
        setTimeEntries(prev => [newEntry, ...prev]);
        resetTimer();
      } else {
        throw new Error('Failed to save time entry');
      }
    } catch (error) {
      console.error('Error saving time entry:', error);
      setShowSaveErrorToast(true);
    } finally {
      setLoading(false);
    }
  };

  const loadTimeEntries = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/time-entries`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const entries = await response.json();
        setTimeEntries(entries);
      }
    } catch (error) {
      console.error('Error loading time entries:', error);
    }
  };

  const deleteTimeEntry = async (id) => {
    setDialogConfig({
      title: 'Delete Entry',
      message: 'Are you sure you want to delete this entry?',
      buttons: [
        {
          type: 'cancel',
          text: 'Cancel',
          onClick: () => {}
        },
        {
          type: 'confirm',
          text: 'Delete',
          onClick: async () => {
            try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/api/time-entries/${id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              });

              if (response.ok) {
                setTimeEntries(prev => prev.filter(entry => entry.id !== id));
              } else {
                throw new Error('Failed to delete time entry');
              }
            } catch (error) {
              console.error('Error deleting time entry:', error);
              setShowDeleteErrorToast(true);
            }
          }
        }
      ]
    });
    setShowDialog(true);
  };

  const copyEntryToClipboard = async (entry) => {
    try {
      // Function to convert Quill classes to inline styles for Google Docs compatibility
      const convertQuillToInlineStyles = (htmlContent) => {
        if (!htmlContent) return '';
        
        let convertedHtml = htmlContent;
        
        // Convert alignment classes to inline styles
        convertedHtml = convertedHtml.replace(/class="([^"]*ql-align-(\w+)[^"]*)"([^>]*)>/g, (match, fullClass, alignment) => {
          const otherClasses = fullClass.replace(`ql-align-${alignment}`, '').trim();
          const otherAttrs = match.match(/class="[^"]*"([^>]*)>/)?.[1] || '';
          const styleAttr = `style="text-align: ${alignment};"`;
          return `class="${otherClasses}" ${styleAttr}${otherAttrs}>`;
        });
        
        // Convert heading styles to inline styles
        convertedHtml = convertedHtml.replace(/<(h[1-3])([^>]*)>/g, (match, tag, attrs) => {
          let fontSize, fontWeight, color, marginBottom;
          
          switch (tag) {
            case 'h1':
              fontSize = '1.4rem';
              fontWeight = '600';
              color = '#1f2937';
              marginBottom = '0.5rem';
              break;
            case 'h2':
              fontSize = '1.2rem';
              fontWeight = '600';
              color = '#1f2937';
              marginBottom = '0.5rem';
              break;
            case 'h3':
              fontSize = '1.1rem';
              fontWeight = '600';
              color = '#374151';
              marginBottom = '0.5rem';
              break;
            default:
              return match;
          }
          
          const styleAttr = `style="font-family: 'Oswald', sans-serif; font-size: ${fontSize}; font-weight: ${fontWeight}; color: ${color}; margin-bottom: ${marginBottom}; margin-top: 0.5em;"`;
          
          // Check if there's already a style attribute
          if (attrs.includes('style=')) {
            return `<${tag}${attrs.replace(/style="([^"]*)"/, `style="$1; font-family: 'Oswald', sans-serif; font-size: ${fontSize}; font-weight: ${fontWeight}; color: ${color}; margin-bottom: ${marginBottom}; margin-top: 0.5em;"`)}>`;
          } else {
            return `<${tag}${attrs} ${styleAttr}>`;
          }
        });
        
        // Convert list indentation classes to inline styles
        convertedHtml = convertedHtml.replace(/class="([^"]*ql-indent-(\d+)[^"]*)"([^>]*)>/g, (match, fullClass, indentLevel) => {
          const otherClasses = fullClass.replace(`ql-indent-${indentLevel}`, '').trim();
          const otherAttrs = match.match(/class="[^"]*"([^>]*)>/)?.[1] || '';
          const paddingLeft = `${parseInt(indentLevel) * 2}em`;
          const styleAttr = `style="padding-left: ${paddingLeft};"`;
          return `class="${otherClasses}" ${styleAttr}${otherAttrs}>`;
        });
        
        return convertedHtml;
      };

      const convertedDescription = convertQuillToInlineStyles(entry.description);
      
      const htmlContent = `
        <div style="font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <h3 style="margin-bottom: 8px; color: #111827; font-family: 'Oswald', sans-serif; font-size: 1.1rem; font-weight: 600;">${entry.project}</h3>
          <div style="margin-bottom: 8px; color: #4b5563; font-family: 'Nunito', sans-serif;">
            ${convertedDescription || ''}
          </div>
          <p style="font-size: 0.875rem; color: #6b7280;"><span style="font-family: 'Oswald', 'Nunito', monospace;">Time:</span> <span style="font-family: 'Nunito', sans-serif;">${formatTime(entry.duration)}</span></p>
          <p style="font-size: 0.875rem; color: #6b7280;"><span style="font-family: 'Oswald', 'Nunito', monospace;">Start:</span> <span style="font-family: 'Nunito', sans-serif;">${formatDateTime(entry.start_time)}</span></p>
          <p style="font-size: 0.875rem; color: #6b7280;"><span style="font-family: 'Oswald', 'Nunito', monospace;">End:</span> <span style="font-family: 'Nunito', sans-serif;">${formatDateTime(entry.end_time)}</span></p>
        </div>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      
      // Visual feedback
      const copyBtn = document.querySelector(`[data-entry-id="${entry.id}"]`);
      if (copyBtn) {
        const icon = copyBtn.querySelector('img');
        if (icon) {
          const originalSrc = icon.src;
          icon.src = clipboardCopiedIcon;
          setTimeout(() => {
            icon.src = originalSrc;
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Failed to copy:', error);
      setShowCopyErrorToast(true);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleViewSpreadsheet = (entries) => {
    setSpreadsheetEntries(entries);
    setShowSpreadsheet(true);
  };

  useEffect(() => {
    loadTimeEntries();
  }, []);

  return (
    <div className="timer-app">
      <Header 
        user={user} 
        onLogout={logout}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onMonkeyTrigger={spawnMonkey}
      />
      
      <div className="timer-container">
        <div className="timer-card">
          <TimerDisplay elapsedTime={timerState.elapsedTime} isRunning={timerState.isRunning} />
          
          <div className="input-section">
            <input
              type="text"
              placeholder="Project name"
              value={currentEntry.project}
              onChange={(e) => {
                setCurrentEntry(prev => ({ ...prev, project: e.target.value }));
                if (projectError) {
                  setProjectError('');
                  setProjectErrorFading(false);
                }
              }}
            />
            {projectError && (
              <div className={`project-error-message ${projectErrorFading ? 'fade-out' : ''}`}>
                {projectError}
              </div>
            )}
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={currentEntry.description}
              onChange={(content) => setCurrentEntry(prev => ({ ...prev, description: content }))}
              placeholder="What are you working on?"
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  [{ 'header': [1, 2, 3, false] }],
                  [{ 'align': [] }],
                  ['clean']
                ]
              }}
            />
          </div>

          <TimerControls
            isRunning={timerState.isRunning}
            isPaused={timerState.isPaused}
            onStart={startTimer}
            onPause={pauseTimer}
            onStop={stopTimer}
            loading={loading}
          />
        </div>

        <div className="time-entries-footer-gap">
          <TimeEntries
            entries={timeEntries}
            onDelete={deleteTimeEntry}
            onRefresh={loadTimeEntries}
            onCopy={copyEntryToClipboard}
            onViewSpreadsheet={handleViewSpreadsheet}
            onNoEntries={() => setShowNoEntriesToast(true)}
            onCopyAllError={() => setShowCopyAllErrorToast(true)}
          />

          {/* Spreadsheet Dialog */}
          <SpreadsheetDialog
            isOpen={showSpreadsheet}
            entries={spreadsheetEntries}
            onClose={() => setShowSpreadsheet(false)}
            onCopyError={() => setShowSpreadsheetCopyErrorToast(true)}
          />
        </div>
      </div>

      {/* Monkey Container */}
      <div id="monkey-container">
        {monkeyContainer.map(monkey => {
          const isBanana = monkey.id && monkey.id.toString().includes('banana');
          const animationClass = isBanana ? 'falling-banana' : `monkey-type-${monkey.type || 0}`;
          
          return (
            <div
              key={monkey.id}
              className={`random-monkey ${animationClass} ${monkey.glow ? 'glow' : ''} ${monkey.bounce ? 'bounce' : ''} ${monkey.trail ? 'trail' : ''}`}
              style={{
                left: monkey.x + 'px',
                top: monkey.y + 'px',
                fontSize: `${(monkey.size || 1) * 2}rem`,
                transform: `rotate(${monkey.rotation || 0}deg) scale(${monkey.size || 1})`,
                color: monkey.color || 'inherit',
                filter: monkey.glow ? `drop-shadow(0 0 10px ${monkey.color || '#ffd700'})` : 'none',
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              {monkey.emoji}
              {monkey.trail && (
                <div className="trail-effect" style={{ backgroundColor: monkey.color }}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Monkey Time Text */}
      {monkeyTimeText && (
        <div id="monkey-time-text" className="show">
          It's Monkey Time!
        </div>
      )}

      {/* Monkey Time Mode Indicator */}
      {monkeyTimeMode && (
        <div className="monkey-time-indicator">
          <div className="monkey-time-indicator-content">
            <span className="monkey-time-indicator-text">🐒 MONKEY TIME MODE 🐒</span>
            <div className="monkey-time-indicator-controls">
              <div className="control-row">
                <span className="control-label">Space:</span>
                <span className="control-description">More Monkeys!</span>
              </div>
              <div className="control-row">
                <span className="control-label">Arrows:</span>
                <span className="control-description">Control Monkeys</span>
              </div>
              <div className="control-row">
                <span className="control-label">Click:</span>
                <span className="control-description">Confetti!</span>
              </div>
              <div className="control-row">
                <span className="control-label">ESC:</span>
                <span className="control-description">Exit Monkey Time</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monkey Time Over Button */}
      {monkeyTimeMode && (
        <button 
          className="monkey-time-over-btn"
          onClick={clearMonkeys}
        >
          🐒 Monkey time is over! 🐒
        </button>
      )}

      {/* Custom Dialog */}
      <CustomDialog
        isOpen={showDialog}
        title={dialogConfig.title}
        message={dialogConfig.message}
        buttons={dialogConfig.buttons || []}
        onClose={() => setShowDialog(false)}
      />

      {/* Save Error Toast */}
      {showSaveErrorToast && (
        <div className={`save-error-toast ${saveErrorToastFading ? 'fade-out' : ''}`}>
          <div className="save-error-toast-content">
            <button 
              className="save-error-toast-close"
              onClick={() => {
                setShowSaveErrorToast(false);
                setSaveErrorToastFading(false);
              }}
            >
              ×
            </button>
            <div className="save-error-toast-icon">⚠️</div>
            <div className="save-error-toast-text">
              <h4>Save Failed</h4>
              <p>
                Sorry, we can't save your time entry at the moment.
                <br />
                This might be due to a network error or server issue.
                <br />
                Please try again later.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Error Toast */}
      {showDeleteErrorToast && (
        <div className={`save-error-toast delete-error-toast ${deleteErrorToastFading ? 'fade-out' : ''}`}>
          <div className="save-error-toast-content">
            <button 
              className="save-error-toast-close"
              onClick={() => {
                setShowDeleteErrorToast(false);
                setDeleteErrorToastFading(false);
              }}
            >
              ×
            </button>
            <div className="save-error-toast-icon">🗑️</div>
            <div className="save-error-toast-text">
              <h4>Delete Failed</h4>
              <p>
                Sorry, we can't delete your time entry at the moment.
                <br />
                This might be due to a network error or server issue.
                <br />
                Please try again later.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Copy Error Toast */}
      {showCopyErrorToast && (
        <div className={`save-error-toast copy-error-toast ${copyErrorToastFading ? 'fade-out' : ''}`}>
          <div className="save-error-toast-content">
            <button 
              className="save-error-toast-close"
              onClick={() => {
                setShowCopyErrorToast(false);
                setCopyErrorToastFading(false);
              }}
            >
              ×
            </button>
            <div className="save-error-toast-icon">📋</div>
            <div className="save-error-toast-text">
              <h4>Copy Failed</h4>
              <p>
                Sorry, we can't copy your time entry to the clipboard.
                <br />
                This might be due to a browser permission issue.
                <br />
                Please try again or check your browser settings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Entries Toast */}
      {showNoEntriesToast && (
        <div className={`save-error-toast no-entries-toast ${noEntriesToastFading ? 'fade-out' : ''}`}>
          <div className="save-error-toast-content">
            <button 
              className="save-error-toast-close"
              onClick={() => {
                setShowNoEntriesToast(false);
                setNoEntriesToastFading(false);
              }}
            >
              ×
            </button>
            <div className="save-error-toast-icon">📝</div>
            <div className="save-error-toast-text">
              <h4>No Time Entries</h4>
              <p>
                You don't have any time entries to copy yet.
                <br />
                To create your first entry, start the timer above,
                <br />
                add a project name, and click "Stop" when done!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Copy All Error Toast */}
      {showCopyAllErrorToast && (
        <div className={`save-error-toast copy-all-error-toast ${copyAllErrorToastFading ? 'fade-out' : ''}`}>
          <div className="save-error-toast-content">
            <button 
              className="save-error-toast-close"
              onClick={() => {
                setShowCopyAllErrorToast(false);
                setCopyAllErrorToastFading(false);
              }}
            >
              ×
            </button>
            <div className="save-error-toast-icon">📋</div>
            <div className="save-error-toast-text">
              <h4>Copy Failed</h4>
              <p>
                Sorry, we couldn't copy your time entries to the clipboard.
                <br />
                This might be due to a browser permission issue or a temporary problem.
                <br />
                Please try again or check your browser settings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Spreadsheet Copy Error Toast */}
      {showSpreadsheetCopyErrorToast && (
        <div className={`save-error-toast spreadsheet-copy-error-toast ${spreadsheetCopyErrorToastFading ? 'fade-out' : ''}`}>
          <div className="save-error-toast-content">
            <button 
              className="save-error-toast-close"
              onClick={() => {
                setShowSpreadsheetCopyErrorToast(false);
                setSpreadsheetCopyErrorToastFading(false);
              }}
            >
              ×
            </button>
            <div className="save-error-toast-icon">📊</div>
            <div className="save-error-toast-text">
              <h4>Copy Failed</h4>
              <p>
                Sorry, we couldn't copy your spreadsheet data to the clipboard.
                <br />
                This might be due to a browser permission issue or a temporary problem.
                <br />
                Please try again or check your browser settings.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer; 