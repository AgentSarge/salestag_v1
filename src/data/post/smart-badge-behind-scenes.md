---
publishDate: 2025-01-19T00:00:00Z
author: Will Sargent
title: Behind the Scenes - How the SalesTag Smart Badge Works
excerpt: Peek under the hood of the SalesTag badge — from audio capture to AI tagging and secure storage.
image: https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80
category: Technology
tags:
  - SalesTag
  - Wearable Tech
  - AI
  - Field Sales
  - Hardware
  - Edge Computing
metadata:
  title: "How the SalesTag Smart Badge Works"
  description: "Peek under the hood of SalesTag's wearable AI: audio capture, tagging, cloud sync, and live feedback—all on a badge."
  canonical: "https://salestag.io/blog/how-salestag-works"
  openGraph:
    images:
      - url: "/og/how-salestag-works.jpg"
---

> The future of sales starts with a badge you barely notice — but never forgets.

**SalesTag's badge is more than a recorder. It's a purpose-built device that wakes up when voices are detected, encrypts audio on the fly, and uploads securely to the cloud.**

Building a wearable AI for field sales presented unique challenges. How do you create a device that's unobtrusive enough for daily wear, powerful enough for real-time AI processing, and secure enough for confidential conversations? Here's how we did it.

## The Hardware: Purpose-Built for Field Sales

### Form Factor Philosophy

Most wearables optimize for consumer appeal. SalesTag optimizes for professional utility:

**Size**: 2.3" x 1.1" x 0.4" — small enough to clip discretely, large enough for powerful components
**Weight**: 28 grams — lighter than most smartphones, heavier than a basic name tag
**Materials**: Aerospace-grade aluminum housing with impact-resistant corners
**Attachment**: Magnetic clasp + traditional clip for redundant security

### The ESP32-S3 Heart

At the core is a custom ESP32-S3 microcontroller, chosen for its unique combination of:
- **Dual-core processing** (240MHz + 160MHz)
- **Built-in WiFi and Bluetooth**
- **Low power consumption** (15-hour battery life)
- **Hardware encryption** (AES-256 on-chip)
- **Edge AI capabilities** (vector processing units)

Most IoT devices use off-the-shelf modules. We designed custom silicon optimized for conversation processing.

### Audio Engineering

The biggest technical challenge was audio quality in unpredictable environments. Field conversations happen in noisy spaces: construction sites, busy offices, outdoor meetings.

**Microphone Array**: Three precision mics in triangular configuration
- **Primary**: Directional, optimized for human speech (300Hz-8kHz)
- **Secondary**: Omnidirectional, captures environmental context
- **Tertiary**: Noise-canceling, filters background interference

**Digital Signal Processing**: Custom algorithms that:
- Enhance speech clarity in real-time
- Suppress consistent background noise (HVAC, traffic)
- Preserve emotional tonality and vocal inflection
- Maintain conversation context across multiple speakers

## The Software Stack: Intelligence at the Edge

### Wake Word Detection

The badge doesn't record constantly. It listens for conversation patterns:

```
Voice Activity Detection → Speaker Count Analysis → Recording Decision
```

Our proprietary algorithm detects:
- **Multiple speaker scenarios** (sales conversation vs. phone call)
- **Proximity indicators** (close field conversation vs. distant chatter)
- **Duration thresholds** (meaningful exchange vs. quick greeting)

False positive rate: <2%
False negative rate: <0.1%

### Real-Time Processing Pipeline

Once recording begins, the badge processes audio through multiple parallel streams:

**Stream 1: Transcription Engine**
- On-device speech-to-text using Whisper-optimized models
- 94% accuracy on field sales vocabulary
- Handles multiple speakers, overlapping dialogue, industry jargon

**Stream 2: Sentiment Analysis**
- Real-time emotional tone detection
- 7-point sentiment scale (strong negative → strong positive)
- Identifies sentiment shifts within conversation

**Stream 3: Content Tagging**
- Objection detection (pricing, timing, authority, need)
- Buying signal identification
- Competitor mentions
- Next step commitments

**Stream 4: Security Layer**
- AES-256 encryption before storage
- Zero-knowledge architecture (we can't decrypt without team keys)
- GDPR-compliant data handling

### The Intelligence Evolution

Early prototypes sent raw audio to the cloud for processing. We quickly realized this created three problems:

1. **Latency**: Real-time coaching requires instant analysis
2. **Privacy**: Audio in the cloud raises security concerns
3. **Connectivity**: Field reps don't always have reliable internet

Our current architecture processes 80% of AI analysis on-device, only uploading encrypted summaries and tagged insights.

## The Cloud: Vault and Analysis Engine

### Supabase Infrastructure

SalesTag's cloud architecture runs on Supabase, chosen for:
- **Real-time subscriptions** (instant sync across team devices)
- **Row-level security** (team-specific data isolation)
- **Edge functions** (global low-latency processing)
- **Postgres foundation** (complex querying and AI vectorization)

### Data Architecture

Every conversation creates multiple data artifacts:

```
Conversation Record
├── Audio (encrypted blob)
├── Transcript (structured text)
├── Tags (AI-generated metadata)
├── Sentiment (timeline analysis)
├── Participants (speaker identification)
├── Context (location, duration, outcome)
└── Coaching Notes (human annotations)
```

### The AI Pipeline

Raw conversation data flows through our processing pipeline:

**Stage 1: Enhancement**
- Audio cleanup and normalization
- Speaker diarization (who said what)
- Transcript verification and correction

**Stage 2: Understanding**
- Intent classification (discovery, demo, objection handling, closing)
- Entity extraction (competitors, pricing, timelines)
- Emotional arc mapping (engagement over time)

**Stage 3: Intelligence**
- Coaching opportunity identification
- Best practice pattern matching
- Outcome prediction modeling

**Stage 4: Action**
- Real-time rep feedback
- Manager coaching alerts
- Team knowledge base updates

## Power Management: All-Day Performance

Field sales requires all-day reliability. Our power management system:

### Adaptive Processing

- **Sleep mode**: 0.1mA current draw (standby listening)
- **Active recording**: 45mA current draw (processing + transmission)
- **Charging mode**: 2.1A fast charging (30 minutes to 80%)

### Battery Intelligence

The badge learns usage patterns and optimizes accordingly:
- Heavy conversation days: Conservative processing modes
- Light activity: Full feature enablement
- Low battery: Essential functions only

### Physical Design

- **Wireless charging**: Qi-compatible charging dock
- **USB-C backup**: Emergency charging via standard cable
- **Battery indicator**: Subtle LED status without distraction

## Security: Zero-Trust Architecture

### Device-Level Security

Every badge includes:
- **Hardware security module** (HSM) for key storage
- **Secure boot sequence** preventing firmware tampering
- **Over-the-air updates** with cryptographic verification
- **Remote wipe capability** for lost devices

### Encryption Everywhere

```
Conversation Audio → AES-256 Encryption → Secure Storage → Team-Only Decryption
```

- **End-to-end encryption**: Audio never exists unencrypted outside the badge
- **Key rotation**: Automatic monthly key updates
- **Perfect forward secrecy**: Compromised keys don't expose historical data

### Privacy by Design

- **Consent management**: Clear recording indicators and customer notifications
- **Data minimization**: Only store necessary information
- **Right to deletion**: Complete conversation removal on request
- **Audit logging**: Full access tracking for compliance

## Manufacturing and Quality

### Supply Chain

SalesTag badges are manufactured in ISO 9001 certified facilities with:
- **Component traceability**: Every chip tracked from fabrication to deployment
- **Quality testing**: 48-hour burn-in testing for each device
- **Environmental validation**: Temperature, humidity, shock, and vibration testing

### Durability Standards

Field sales devices face harsh conditions:
- **IP54 rating**: Dust and splash resistant
- **Drop testing**: 6-foot drops onto concrete
- **Temperature range**: -20°C to 60°C operation
- **EMI shielding**: Immune to electronic interference

## The Future: Next-Generation Hardware

SalesTag's current badge is version 1.0. In development:

**Version 2.0 (2025 Q3)**:
- 40% smaller form factor
- Advanced neural processing unit
- Multi-language real-time translation
- Haptic feedback for coaching cues

**Version 3.0 (2026 Q1)**:
- 72-hour battery life
- Augmented reality integration
- Predictive conversation modeling
- Advanced biometric insights

## Beyond Recording: Building the Platform

The badge is just the beginning. Every technical decision optimizes for the future:

- **AGI-ready data formats** for next-generation AI training
- **Modular architecture** supporting new sensors and capabilities
- **Open APIs** for third-party integration and innovation
- **Scalable infrastructure** supporting millions of conversations

**SalesTag's badge isn't just hardware — it's the foundation of an entirely new category of sales intelligence.**

From the ESP32 chip to the Supabase cloud, every component was chosen to support our vision: giving sales teams a permanent, intelligent memory that makes every conversation count.

---

*Curious about the technical architecture powering your team's sales intelligence? [Join our early access program](/subscribe) to experience the SalesTag badge firsthand.* 