---
title: "Satellite Communications"
topic: "Aerospace"
path: "satellite-communications"
author: "David Lu"
date: "2025-06-22"
preview: "An (updated) beginner's guide to satellite communication systems. This supplements an older post I made back in 2022."
---

This is an updated post on satellite communication systems. A few years ago, I wrote a general article on communications, but looking back, it feels disorganized and incomplete. You can still read that [here](/posts/communications) if you like. In constrast, this post aims to be more comprehensive and more focused on communication as it applies specifically to **satellites**.

# Introduction

<v-divider></v-divider>

To start, let's define some terms that always used to confuse me because they were so similar. 

<v-card class="mb-5">
    <v-table density="compact">
        <thead>
            <tr>
                <th>Term</th>
                <th>Definition</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Wideband</td>
                <td>A communication system that occupies a relatively large range of frequencies.</td></tr>
            <tr><td>Narrowband</td>
                <td>A communication system that occupies a relatively small range of frequencies.</td></tr>
            <tr><td>Baseband</td>
                <td>The original, low-frequency signal that has not been modulated to higher frequencies for transmission.</td></tr>
            <tr><td>Broadband</td>
                <td>A system that can carry multiple signals or channels simultaneously over a wide frequency range.</td></tr>
        </tbody>
    </v-table>
</v-card>

<v-card class="mb-5">
    <v-table density="compact">
        <thead>
            <tr>
                <th>Term</th>
                <th>Definition</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Beamwidth</td>
                <td>For an antenna, the beamwidth is the angle of the main lobe, measured between the points where the power drops to half of its peak value. In other words, the beamwidth describes how focused or spread out the antenna's signal is. </td></tr>
            <tr><td>Bandwidth</td>
                <td>The bandwidth is the range of frequencies used by a system. A greater frequency range generally means more data can be transmitted.</td></tr>
        </tbody>
    </v-table>
</v-card>

## More Bandwidth is More Data

Why does a greater bandwidth allow for more data? Well let's take a step back and imagine a very complex signal - some kind of time-varying curve. If you recall, *Fourier's Transform* tells us that any time-varying signal is actually just the sum of many different sinusoids at different frequences. 

When we transmit data, we encode information by varying the characteristics (amplitude, phase, frequency) of these sinusoidal components over time. The bandwidth of the signal — defined as the range of frequencies where these components have significant energy — determines how complex or rapidly changing the signal can be. A signal with a narrow bandwidth has fewer frequency components, which means its waveform must change more slowly over time (because rapid changes require higher-frequency components). Conversely, a wideband signal includes more frequency components, allowing it to represent faster variations and thus encode more bits of data in a given time.

<v-card variant="tonal" class="mb-5 mt-5">
    <v-card-text>
    Greater complexity and faster changes in the time domain require a wider range of frequencies in the frequency domain.
    </v-card-text>
</v-card>

## Other Terms

Here are some other miscellaneous terms and concepts:

<v-card class="mb-5">
    <v-table density="compact">
        <thead>
            <tr>
                <th>Term</th>
                <th>Definition</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Bi-Level Communication</td>
                <td>Consisting of two states (i.e. 0 and 1). In constrast to *analog*.</td></tr>
            <tr><td>Serial Communication</td>
                <td>Commmunication that consists of sending data one bit at a time. </td></tr>
            <tr><td>Encoding</td>
                <td>A bit of an overloaded term, but generally, encoding is the mapping of data (i.e. 0 and 1) into a new format. This often provides structure, ensures synchronization, or adds redundancy for error detection and correction — but not always. For example, convolutional encoding, Manchester encoding. </td></tr>
            <tr><td>Modulation</td>
                <td>Modulation techniques convert bits into changes in the carrier signal (amplitude, frequency, or phase) in order to carry data over a physical medium. Modulation prepares data for transport. For example, QPSK. </td></tr>
        </tbody>
    </v-table>
</v-card>

# Modulation
<v-divider></v-divider>

At a high level, modulation combines two signals. But let's define this mathematically. First, let's define a message signal $m(t)$ that's low frequency. Next, we'll define the carrier signal that's at a much higher frequency:

$$c(t) = cos(2 \pi f_c t)$$

We can modulate the amplitude, frequency, or phase, and each one will have a slightly different mathematical expression.

$$x_{amp}(t) = [1+m(t)] cos(2 \pi f_c t) $$

$$x_{freq}(t) = cos(2 \pi f_c t + k \int m(t) dt)$$

$$x_{phase}(t) = cos(2 \pi f_c t + k_p m(t))$$

You might notice that the phase and frequency modulated signals look very similar. This makes sense, because frequency is just the derivative of phase. 

# Ranging
<v-divider></v-divider>

Satellite ranging is not strictly a type of communication as we might think of it, but (traditionally) it's performed via the same RF uplink and downlink systems used for telemetry and commanding, so it ends up in this group. Ranging is the process of determining how far away, and how quickly a satellite is moving relative to a ground station (i.e. like what a radar does). The ground station transmits an RF signal which is recieved by the satellite. The satellite transmits this back, and by measuring the round trip time and the doppler shift of the returned signal, the ground station can calculate the satellite's distance and relative speed. Let's illustrate this with some equations. First, we'll define a simple ranging signal:

$$s(t) = sin(2\pi ft)$$

The transmitted signal is a phase-modulated carrier with the sinusoidal tone:

$$x(t) = cos(2 \pi f_c t + sin(2\pi f_m t))$$

Where $f_c$ is the RF carrier frequence, e.g. some S-band frequency and $f_m$ is the modulation frequency (much slower, such as 1 kHz). The spacecraft echoes or re-transmits the waveform but now some amount of time will have passed:

$$y(t) = cos(2 \pi f_c t + sin(2\pi f_m (t+\Delta t)))$$

When the ground station recieves $y(t)$, they can measure the phase difference, and use that to compute the delay. 

<v-card variant="tonal" class="mb-5 mt-5">
    <v-card-title>What about Integer Multiples of the Period?</v-card-title>
    <v-card-text>
    As with any periodic signal, delays that differ by an integer multiple of the period look the same. To resolve this, *sequential* ranging uses multiple tones at different frequencies. A ground station transmits each tone sequentially, and measures the phase shift. By combining each measurement, we can "triangulate" in on the true delay. 
    </v-card-text>
</v-card>

Alternatively to sequential ranging, there is also Psuedo-random noise (PN) ranging. Rather than measuring the phase difference of an RF signal, a ground station transmits a psuedo-random sequence of 0's and 1's. The satellites still returns it, and the ground correlates the returned code to find the **code phase offset**, rather than the literal RF phase offset. This often works better for modern digital systems. 

# CCSDS

<v-divider></v-divider>

The [Consultative Committee for Space Data Systems](https://ccsds.org/) is an international organization that has standardized space communications and data systems. They create and define protocols that cover the full range of the communication stack, from physical properties, to transport layers, to recommended operating procedures. These standards are widely adopted, so it's important to know them well. As we go through the OSI model, I'll try to point out the relevant CCSDS document at each layer. 

# OSI Model

<v-divider></v-divider>

The Open Systems Interconnection (OSI) model is a handy framework for thinking about the entirety of a communication system. The model divides everything into 7 layers, starting from the lowest level physical implementation of a communication system, to the highest-level presentation of data to end users. We'll step through each layer and think about how they might apply to a satellite.


## 1. Physical Layer

*What physical device is going to transport my data?*

The physical layer converts data into signals and carries it across your network. Any kind of physical device belongs to this layer. This includes physical wiring standards and cables such as:

1. [MIL-STD 1553B](/posts/1553b)
2. Ethernet
3. Spacewire
4. RS-422
5. LVDS
6. Waveguides
7. Coax Cables

Some of these technologies also include higher level functions, but at a minimum, all of these define some type of physical layer architecture that governs how signals are carried. I covered many of these in my original post on [communications](/posts/communications). 

But the physical layer isn't limited to copper or fiber - it also includes wireless technologies, which we can all agree is important when your receiver or transmitter is in orbit. Physical wiring may be implemented onboard the satellite, but communication between satellites and other satellites or ground stations is wireless, and that typically uses either radio frequency (RF) or laser based optical systems. 

Two common (but quite old) spacecraft communication systems are the Space Ground Link System (SGLS) and Unified S-Band (USB). These are primarily physical and data-link layer implementations. 


## 2. Data Link Layer

*How should I format each frame of data on the network?* 

The data link layer is responsible for node-to-node data transfer, error detection and correction. This usually results in the design of individual transfer packets, and may include things like checksums or parity bits. Within CCSDS, there are two sublayers to the data-link layer - the Data Link Protocol Sublayer, and the Synchronization and Channel Coding Sublayer. These cover protocols such as:

1. Telemetry (T​M) Space Data Link
2. Telecommand (TC) Space Data Link
3. Advanced Orbiting Systems (AOS) Space Data Link

An individual data unit in the datalink layer is known as a "Transfer Frame". TM uses fixed-length transfer frames, but TC uses variable-length transfer frames. TC also includes a function for transmitting lost or corrupted data, which TM and AOS omit in favor of efficiency and simplicity for downlinked telemetry. 

The real physical channel is also logically divided into a number of Virtual Channels. This sub-division is just to help you organize your individual data streams - each virtual channels usually serves a dedicated service. Thus, each transfer frame contains a virtual channel ID (VCID) that identifies the VC to which it belongs.

Finally, don't confuse a transfer frame with a data packet from the *Space Packet Protocol*. The SPP operates at the network layer (though it is not a networking service) and is responsible for end-to-end data encapsulation. In contrast, TF's are purely concerned with transmission over the data-link. Typically, a single SPP packet is too large to fit within one transfer frame, and must be segmented across multiple TF's. 

<v-card variant="tonal" color="#003D50" class="mb-5 mt-5">
    <v-card-text>
    Transfer Frames, Space Ground Link System (SGLS), Unified S-Band (USB), Channel Access Data Unit (CADU). 
    </v-card-text>
</v-card>

## 3. Network Layer

*How do I get my data sent to the right place?*

The network layer decides which physical path data will take. It handles routing, and also fragmentation if necessary. You are probably most familiar with IP addresses, which are used by the networking layer to coordinate data traffic.

Older satellites tended to not use a networking layer - opting instead for simpler, deterministic, and fixed communication systems. For example, MIL-STD-1553B may have remote terminals, but nothing is actually dynamic or routed. A shared central databus carries data sequentially and is broadcast to all remote terminals at once. In constrast, newer satellites, especially the ones in LEO mega-constellations such as Starlink and Kuiper, are designed explicitly to act as network routers. 

CCSDS defines something called the *Space Packet Protocol* which often gets mapped to the network layer. However, the primary function of this protocol is to identify and encapsulate data to facilitate its transfer. It does not provide any actual networking services to manage and direct routes. 

<v-card variant="tonal" color="#DE3A00" class="mb-5 mt-5">
    <v-card-text>
    Routing network traffic, e.g. to different satellites or ground stations or the routing of commands onboard a satellite to various units. 
    </v-card-text>
</v-card>

## 4. Transport Layer

*How can I ensure that my data gets to its destination reliably and in order?*

The transport layer handles data transmission between devices via protocols. This can include things like keeping packets in the right order, rules for acknowledgement, and the process for requesting re-transmission. 

For example, imagine watching a Youtube video vs making a bank transaction. You might be ok with dropped packets on a video, but much less so when transferring money. The kind of rules that govern this kind of data integrity is covered by transport layer protocols - such as the Transmission Control Protocol (TCP) and User Datagram Protocol (UDP). 

TCP and UDP however, are protocols for the internet, which assumes things like low-latency and high availability, which don't hold up as well for satellites. Back in the day, CCSDS released their own transport protocol called SCPS-TP, but this is not used very much anymore. Instead, this has been replaced by two newer paradigms called CCSDS File Delivery Protocol (CFDP), and Delay Tolerant Networking (DTN). 

### CCSDS File Delivery Protocol (CFDP)

Technically speaking, CFDP exists as both a transport layer *and application* layer protocol. Its primary goal is to transport files reliably and efficiently over an unreliable protocol. It can be used directly with the data link layer to transport a single file, or it can be integrated with DTN's Bundle Protocol (BP) for bigger picture systems. 

<v-card variant="tonal" class="mb-5 mt-5 font-italic">
    <v-card-text>
    <p>
    CFDP is designed to meet the needs of space missions to transfer files. It is a file transfer protocol, but it also provides services typically found in the Transport Layer, that is, complete, in-order, and without duplicate data delivery. It can be used on top of any protocol of the Network Layer (i.e., IP over CCSDS or DTN BP), on top of the Space Packet Protocol (mission specific APID assignment to CFDP required) or Encapsulation Packet Protocol, or directly on top of the CCSDS Space Data Link Protocols if a Virtual Channel, a MAP, or a Port is assigned to CFDP. In some circumstances, it can be used on top of UDP, TCP, or SCPS-TP. Alternatively, CFDP can be used in Unacknowledged Mode (i.e., with Transport Layer functionality disabled) on top of DTN (BP/LTP, providing Transport Layer functionality at the layer underlying CFDP).
    </p>
    <p class="text-right mb-0">
    - CCSDS Report: Overview of Space Communications Protocols
    </p>
    </v-card-text>
</v-card>

### Delay Tolerant Networking (DTN)

DTN is a joint networking/transport layer architecture, and is primarily implemented through something known as the "Bundle Protocol" (BP). This protocol defines a node to node hopping type of architecture. It's essentially a *store and forward* design, which works especially well for satellite systems because it supports long-latency, high outage periods, and unreliable interfaces. However, BP is itself agnostic to individual transport interfaces (e.g., RF, TCP, UDP, etc.). Thus, an additional adapter is needed. 

This adapter is called the **Convergence Layer Adapter (CLA)**. This layer is used just below a DTN BP’s transport layer. Since BP does not know what type of transport it’s using on an individual hop, it relies on a CLA to package the data for the particular transport, (e.g. TCP, or CCSDS AOS), and then unpackage it and hand it back to the BP.

<v-card variant="tonal" color="#B08600" class="mb-5 mt-5">
    <v-card-text>
    Data segmentation, end-to-end delivery, flow control, retransmission, TCP, UDP, delay tolerant networking.
    </v-card-text>
</v-card>

## 5. Session Layer

*How do I start, manage, and end a conversation?*

The session layer is responsible for starting, maintaining, and ending communications. This is an important layer for satellites especially because (most) orbits will frequently take a satellite in-view and out-of-view of different ground stations. Each of these occasions will require a process to handle the build-up, tear-down, and/or hand-off of communications.  

<v-card variant="tonal" color="#484848" class="mb-5 mt-5">
    <v-card-text>
    Comms authentication and set-up, teardown, hand-off.
    </v-card-text>
</v-card>

## 6. Presentation Layer

*How should the data be formatted for use or display?*

The presentation layer configures data into an acceptable formats via translation, encryption, and compression. These might be added to meet cyber security requirements, or to reduce the overall bandwidth required. 

<v-card variant="tonal" color="#00465C" class="mb-5 mt-5">
    <v-card-text>
    Encryption, encoding, and compression of commands, telemetry, and mission data.
    </v-card-text>
</v-card>

## 7. Application Layer

*What does the end user want to do?*

The application layer defines how data is communicated to and accessed by end users. The code that created this website is an example of the application layer, delivering content I've written to your eyes.  

<v-card variant="tonal" color="#000000" class="mb-5 mt-5">
    <v-card-text>
    The frontend user interface, presentation of mission data, command interface, telemetry displays.
    </v-card-text>
</v-card>


# Multiple Access

<v-divider></v-divider>

Let's say you have 10 satellites, but only 1 ground station. How can you support all 10 satellites with this single resource? The answer is to use multiple acccess. There are a few ways to separate each individual link:

### Time Division (TDMA)
Each link is assigned a different time slot. Time division was used in 2G cellular systems. 

### Frequency Division (FDMA)
Each link is assigned a different carrier frequency. Bandpass filters at the receiver separate the individual carriers from each other. The original 1G and 2G mobile networks used FDMA (among other things).

### Code Division (CDMA)
Each link is assigned a unique **spreading code**, typically chosen to be **orthogonal** or have low cross-correlation with others. This code is applied to the user’s data, spreading the signal over a much wider bandwidth than the original data rate (spread spectrum). At the receiver, the same code is used to despread and extract the intended signal, effectively separating it from others sharing the same frequency band. 3G mobile networks saw the introduction of wideband and narrowband CDMA, replacing older FDMA and TDMA systems. 

### Orthogonal Frequency Division (OFDMA)
Current 4G and 5G mobile networks use Orthogonal Frequency Division Multiple Access, or OFDMA. This method divides the frequency band into many orthogonal subcarriers. These subcarriers are shared *dynamically* across time and frequency (i.e. from one time slot to the next, the user assigned to a given subcarrier changes.)

# Calculating Data Rate

<v-divider></v-divider>

We've covered the basics concepts, but how do we get numbers on our design? To start, we need to know what our mission data is. From there, the **Nyquist-Shannon Sampling Theorem** tells us that:

<v-card variant="tonal" class="mb-5 mt-5">
    <v-card-text>
    To perfectly reconstruct a band-limited analog signal from its samples, the sampling frequency must at least twice the highest frequency component of the signal.
    </v-card-text>
</v-card>

For example, if we are trying to capture and transmit the human voice, we need to double that frequency to find our sample rate. Once we know the required number of samples per second, we then need to figure out how to *quantize* our data. Using more bits per sample reduces quantization error (resulting in higher fidelity) but requires a higher data rate. For instance, if each sample is represented using a byte (8 bits), we have 256 distinct levels to represent the signal amplitude. Finally, the data rate is simply:

$$\frac{samples}{second} \times \frac{bits}{sample} = \frac{bits}{second}$$

From a design standpoint, antennas tend to be cost-drivers for satellites. Finding clever ways to reduce the required data rate (e.g. with compression) can reduce the overall program costs. 

# References

<v-divider :thickness="5"></v-divider>

* Wertz, J. R., & Larson, W. J. (Eds.). (1999). *Space Mission Analysis and Design* (3rd ed.).
* Hamkins, Kinman, Xie, Vilnrotter, and Dolinar. (2015). [*Telemetry Ranging: Concepts*](https://ipnpr.jpl.nasa.gov/progress_report/42-203/203C.pdf). *IPN Progress Report*. 
* Consultive Committee for Space Data Systems. (2023, April). [*Overview of Space Communications Protocols*](https://ccsds.org/Pubs/130x0g4e1.pdf) (CCSDS 130.0-G-4).

