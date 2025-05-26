---
title: "Communications 101"
topic: "Engineering"
path: "communications"
author: "David Lu"
date: "2022-07-09"
preview: "A random assortment of communications technology terms I've encountered over the years. Most of these are things I've encountered at work, rather than anything I've formally studied."
---

A random assortment of communications technology terms I've encountered over the years. Please keep in mind that electrical engineering and signal processing is *not* one of my subjects, so take everything here with a grain of salt. 


### Synchronous vs Asynchronous

When you are transmitting digital data, how does the reciever and transmitter agree on what constitutes a new byte? Well, one solution is to give both ends a clock set to the same frequency. Everytime a new "tic" occurs, the receiver looks at the status on the line (i.e. high or low) and records it. This is known as asynchonous communication, because the timing mechanism on the transmitter and receiver ends do not communicate with one another. 

In the case of synchronous communication, we have the transmitter send a separate clock signal (e.g. a pulse) to the receiver. This pulse usually slightly leads the actual data so the receiver can "perk up its ears" after it receives the pulse. This adds a second interface, but it can be used when speed and high data rate is important.

Returning to asynchronous for a moment, one failure mode that may arise is for the two communication points to fall out of sync. To mitigate this, we often add start/end of message bit patterns that the receiver can use to get back in phase with the transmitter (e.g. like in 1553B words). Unfortunately these sync patterns take up a portion of the total bandwidth. This means we have different *interface speeds* and *data transfer speeds*. 

# Communication Systems

<v-divider></v-divider>

## ML-STD 1553

A traffic control protocol for managing information traffic from multiple sources on a shared physical line. 1553 requires a controlling bus computer (BC) and an addresses for each terminal. The underlying constraint of 1553 is that traffic is never parrallel. In other words, each terminal takes turns using the line, and ignores any information on the line while not actively in use. On any given 1553 line, there can be up to 31 *remote terminals* (RTs), each with their own *subaddresses*. For more information, check out the full post on [1553B](/posts/1553B/). 

<v-card variant="tonal" class="mb-5">
  <v-card-text>
    Being an older protocol, 1553 only has a bandwidth of around 1 Mbps.
  </v-card-text>
</v-card>


## Ethernet

Ethernet is another communications protocol, defined at the physical layer and data link layer. In contrast to 1553 which uses a shared bus topology, ethernet supports direct transmission paths between devices. The data link layer has two different aspects. There's the Logical Link Control (LLC) and the Media Access Control (MAC).

There are also two transmission modes:

1. Half Duplex - transmission is only allowed in 1 direction at any given moment.
2. Full Duplex - transmission is allowed in both directions at once.

> Standard ethernet has bandwidths of 100 Mbps, 1000 Mbps, or 10 Gbps. 

## SpaceWire

If you need the high bandwidth capability of ethernet, but also want something a bit more tailored to space applications, there's SpaceWire. This is a point to point network, and features better reliability than Ethernet. It's slightly less suitable for huge networks, but when you're talking about a spacecraft there are only a handful of nodes anyway. 


## RS-422

A point to point interface which transmits digital/bi-level information by changing the difference in voltage between two lines. This allows for higher data rates and lower noise in comparison to a single voltage line because we can achieve the same total change in the difference with only half the voltage change in each line. 

> RS422 has a typical bandwitch of up to 10 Mbps

## LVDS

This stands for low voltage differential signaling, and works the same as RS-422. But LVDS uses especially low voltages, on the order of 250 mV. 

### Miscellaneous Definitions

<v-card variant="tonal" class="mb-5 mt-5">
    <v-card-title>Bi-Level Communication</v-card-title>
    <v-card-text>
    Consisting of two states (i.e. 0 and 1). In constrast to *analog*.
    </v-card-text>
</v-card>

<v-card variant="tonal" class="mb-5">
    <v-card-title>Serial Communication</v-card-title>
    <v-card-text>
    Commmunication that consists of sending data one bit at a time. 
    </v-card-text>
</v-card>


# Hardware

<v-divider></v-divider>

## Traveling Wave Tube Amplifier

Often abbreviated to just TWTA, this is a device used for amplifying radio signals. Satellites often need this since they communicate over large distances. 

> Alternatively, you can also use solid state amplifiers. 

## Waveguide

A waveguide is used to move an electromagnetic signal (usually microwaves). It restricts transmission to just one direction, so there is very little loss along the path. A great and easy to understand description of how waveguides work can be found [here](https://www.pa3fwm.nl/technotes/tn21-how-does-a-waveguide-work.html).

The basic idea is that waves are "bouncing" in a zig zag pattern from wall to wall. This allows the signal to satisfy the required boundary conditions. The specific angle and phase of this "bounce" is unique and depends on the frequency of the signal and the width of the waveguide. For every waveguide, there is a *cut-off frequency*. Signals below this frequency (i.e. longer wavelengths) cannot propogate through that waveguide. 

In order for this bounce to take place, a waveguide must be at least half a wavelength wide. The lower end of Microwaves have a wavelength of 1m, so you can imagine that construction becomes increasingly problematic if we continue to drop the frequency. For lower frequencies, there are coax cables.

## Coax-Cable

A co-axial cable is another way to transmit an electrical signal. The signal propogates through some conductor (copper usually) so losses are comparitively higher. A coax cable consists of 4 layers, all aligned in the same direction (hence co-axial).

1. An inner conductor (carries the main signal).
2. A non-conductive dielectric around inner conductor.
3. An outer conductor (to block interference).
4. An outer non-conductive sheath around the entire cable. 

# Message Security/Integrity

<v-divider></v-divider>

Besides protocols and hardware to manage communications, we'd should also think about ways to ensure security and check the integrity of what we communicate. But before jumping in further, I do want to highlight the distinction between integrity and authenticity. 

Integrity is a simple check to see if the data is complete, or it's accurate. Authenticity checks to ensure that data has not been modified in transit, or that it comes from the source/target you expect. Security measures usually help to ensure *authenticity* rather than integrity.  

An easy integrity check to start with is Parity. This is a single bit which tells you if there is an even or odd number of 1's in the transmitted signal. We can use this to check the integrity of a message.

Another integrity check we can do is called a checksum. A checksum function transforms some input and calculates an output. Strong checksum functions will produce unique outputs, even for similar inputs. If a receiver and transmitter both know the checksum function, they can each calculate the checksum value and by comparing the outputs, verify that the sent and received message are the same, without revealing the message itself. 

## Hashing

Hashing is another way to *validate* the content of a message (different from protecting the content). A hashing function is a deterministic function which produces a unique output (often called the digest) for each possible input. A typical process might look like this:

1. I put together a message and calculate the hash digest.
2. I send you that message, and you independently calculate the hash digest using the same hash function.
3. We compare hash digests. If they are the same, we know that we have the same message. 



