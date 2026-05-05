---
title: "Cryptography"
topic: "Engineering"
path: "cryptography"
author: "David Lu"
date: "2026-01-23"
preview: "Cryptography shows up everywhere in my life. It’s embedded in the satellite systems I work on, shaping the way we communicate, and the operations I design. Day to day, cryptography also shows up, protecting my identity, finances, and privacy in a world that is ever more digital. And worst of all, it’s incredibly *interesting* too. Hackers? Algorithms? Secret codes? Mathematics? It was only a matter of time before I got here."
---


Cryptography shows up everywhere in my life. It’s embedded in the satellite systems I work on, shaping the way we communicate, and the operations I design. Day to day, cryptography also shows up, protecting my identity, finances, and privacy in a world that is ever more digital. And worst of all, it’s incredibly *interesting* too. Hackers? Algorithms? Secret codes? Mathematics? It was only a matter of time before I got here. 

Despite how much I interact with it, I had never formally studied the subject, and I wanted a better mental model of what modern cryptography actually is. This post distills the main ideas that stood out to me from Keith Martin’s “Cryptography: The Key to Digital Security — How it Works, and Why it Matters”.

# Data Confidentiality

<v-divider></v-divider>

**Steganography** - the study of information *hiding* mechanisms. This is not particularly useful for cryptography and cyber security, but has a few niche applications. For example, in intellectual property: a map maker hides a fake town to identify when someone has copied their work (also known as a paper town). Hiding data is useful when you don’t want someone else to see it. It’s not very useful as a means to protect communication. 

## Encryption

These days, encryption is the primary method of protecting data confidentiality. The basic structure is this:

  *cipher-text = algorithm(key, plain-text)*

In other words, the cipher-text is output by providing an encryption key and plain-text to an encryption algorithm. If the encryption key and decryption key are the same, this is called *symmetric* encryption. If they are different, they are called *asymmetric*. 

### Data Encryption Standard (DES)
A symmetric encryption block cipher algorithm widely used in the 1980’s through 2000’s. Today it’s been shown that DES is no longer all that secure, but it’s so widely embedded that many systems still use it. 

### Advanced Encryption Standard (AES)

Released in 2001, AES is now the dominant symmetric encryption algorithm being used worldwide. The basic algorithm takes the plain-text input and blocks them into 4x4 byte squares. From here, a series of transformations are applied, including application of the key. This overall process is then repeated many times to produce the final cipher-text output. 

One weakness to watch out for with block ciphers like this is recurrences. If the same word keeps appearing in plain-text, and the same algorithm and keys are used to encrypt that word every time, then an attacker would begin to notice certain repetitions in the cipher-text. This type of information is susceptible to frequency analysis. To get around this, block ciphers must be operated in a way that makes them look more like stream ciphers. 

## Asymmetric Encryption
Conceptually, here’s how this type of encryption works. Let’s say I want to transmit data securely to my bank. First, I reach out to the bank, and ask them to send me a padlock. This type of lock is special because anyone can lock it, but only my bank has the key to unlock it. I can use this lock to secure my data, and then send it over.

In cryptography terms, “anyone can encrypt with the public key, but only the holder of the private key can decrypt”. However, it’s important to note that decryption is ALWAYS possible, even without the private key, it’s just very difficult. Security comes from the assumed computational difficulty. As with nearly all modern cryptography, public-key systems are not *theoretically* secure. Given an infinitely powerful computer, all widely used asymmetric encryption schemes would be breakable.

### Rivest-Shamir-Adleman (RSA)
The most widely known asymmetric encryption algorithm. Fundamentally, this algorithm is based on finding prime factors. If you already have the prime factors, it’s very easy to multiply them together, and verify they are indeed the correct primes. However trying to do this in reverse is dramatically more difficult. If you start with the product, trying to *find* the prime factors has proved computationally infeasible with any algorithm we know of (as of 2026). 

### Diffie-Hellman
The other widely used asymmetric encryption algorithm is based on discrete logarithms. Here's the basic setup: 

$$G^X mod P = y$$

Given G, X, and P, it’s easy to compute Y. But given G, P, and Y, it’s very difficult to compute X. This type of encryption is frequently used for key distribution.


# Data Integrity

<v-divider></v-divider>

*I have received the data that the sender intended for me to receive.*

Encryption may protect data by ensuring it remains confidential, but how can you verify that the person on the other end is really who they say they are? How can you guarantee that the data is not modified along the way?

## Keyed Hash Function
The keyed hash function is one way for a sender/receiver to guarantee authentication, and protect the integrity of their communication.

First, the sender and receiver both agree on a key (a symmetric key). This key is appended to a file, and then the hash is computed on both the combined file and key. The sender then sends the file without the appended key, and the hash. The receiver appends the key, and recomputes the hash. A matching hash confirms two things:

  1. The sender has the same secret key (authentication)
  2. The data was not modified in transit (integrity)

This protects against attackers who make deliberate changes to the file, because the secret key is required to accurately compute the hash. 

In practice, this exact operation does not work. Instead, a special hash function is used that incorporates the secret key in a more sophisticated manner. These hash functions are also known as Message Authentication Codes (MACs).

## Non-repudiation
A MAC can provide authentication and protection, but because it is symmetric, it can’t prove who created the original message. Since the sender and receiver both have the secret key, either party has the power to generate a copy. 

This type of proof is called non-repudiation, or the ability to link an integrity check (like a MAC) to a unique source. Non-repudiation proves that a particular entity created a particular piece of data (and prevents them from claiming they didn’t). This allows anyone else to verify who created a piece of data. Most commonly known as a “Digital Signature”.

An HMAC authenticates a message to its recipient, while non-repudiation provides verifiable evidence to any third party of the message’s true origin.

To create a digital key, we need asymmetric encryption. First, the sender encrypts the data by using their private key, and the recipient verifies the integrity of the data by decrypting it using the sender’s public key. In practice, here’s how it goes:
  1. The sender computes a hash of the data (for integrity)
  2. Then this hash is digitally signed (much smaller than the original data) using the sender’s private key. 
  3. The receiver computes a hash on the data (this verifies integrity)
  4. Then they use the public key to decrypt the digital signature, and if the decrypted hash matches the calculated hash, this verifies the digital signature. The digital signature provides both “data origin authentication” as well as “non-repudiation”.

"Digital Signatures are to data integrity what asymmetric encryption is to data confidentiality."
  
# Entity Authentication

<v-divider></v-divider>

*Is someone who they say they are?*

The goal of entity authentication is to establish either identity, or authorization, and have some indication of freshness. These are things like two factor authentication. The goal of this type of security is to verify a sender is indeed who they say they are (not just that the data they send is correct & valid). 

Passwords for example, don’t have any check of freshness or identification in a truly cyber world. Especially if the host stores a database of passwords directly. These present a prime target for hackers. One simple way around this vulnerability is to work with hashed passwords instead. The receiver doesn’t store the password itself, only the hash. This makes it impossible for a hacker to learn any user passwords from the hashes stored there.

**Key-stretching Algorithms** - a type of hash that adds a small delay (like 1 second) to the computation time. This doesn’t affect a single user’s login, but it deters attackers attempting a “dictionary attack” by guessing and checking a database of common passwords. 

## Challenge-Response
The format of communication answers the question “who’s out there?” You throw out a challenge, and then check for the response to make sure it is coming from who you want it to come from. This is usually the fist step of any cryptographic protocol, and the first step of entity authentication. Here’s an example:

  1. The sender and receiver share a “real” password that’s actually a crypto key. This key is never transmitted.
  2. The sender issues a challenge, which could be a random number sequence.
  3. You (the receiver) calculate a response using the challenge and your secret key. You send the response back.
  4. The sender compares your response against it’s own calculation using the key and the challenge. 
  5. If they match, the sender knows exactly who answered the challenge. 

One example of where this protocol comes up is when you connect to a website. Your web browser and the web server shake hands first using a challenge-response protocol called “Transport Layer Security” (TSL). 

### Anonymity
What if we want the opposite of authentication? What if we want to protect our identity and make it hidden? One way to do this is with something called “Onion Routing”. Instead of sending data directly, route your data through many different locations, with each step being encrypted along the way. Each router strips a layer of encryption to find out the next destination. Thus no single location can know both the sender and receiver. 

# Breaking Cryptography

<v-divider></v-divider>

Most often, cryptography is not broken by straight analysis of the raw ciphertext. In fact, the mathematical core of cryptography is often the strongest part, and a decent hacker knows not to focus their limited resources (however much that might be) trying to defeat it head-on. Instead, real failures tend to occur elsewhere. Keys that are not rotated, insecure implementations, or humans who can be easily fooled by phishing emails or phone calls are much easier points of entry.


<v-card variant = "tonal" class="mb-5">
    <v-card-text>
    Security depends on the entire protocol working correctly. From entity authentication, to data encryption, and data origin authentication. 
    </v-card-text>
</v-card>

### Protecting Encryption

Here are some rules and tips on how to use cryptography effectively:

* Use state of the art, and not outdated algorithms
* Key length matters, to at least defeat the possibility of an exhaustive key search
* Do not encrypt the same predictable block of plaintext over and over
* Do not leave clues about your message contents lying around (e.g. don’t only encrypt part of your message)
* Real implementations can have weaknesses that designed/mathematical protocols do not
* Protect your keys! (Don’t get lazy)
  
### More on Protecting Keys
Poor key management is a major weakness of crypto protocols.  
  • First, generate good keys using good pseudo-random number generators.
  • Be careful during distribution. Most keys are distributed using asymmetric encryption. One such example is the Diffie-Hellman Key Agreement outlined above.

## Public Key Certificate
This certificate links a public key to its owner. In other words, “This certificate guarantees that the public key of [entity] really is [key]”. These certificates must also be certified, (I.e. they are digitally signed, by the certificate authority). 

### Weakness of Implementation
Side-channel attack - these attacks exploit different aspects of the implementation of cryptography to leak information about the security keys being used. For example, measuring the time it takes for an implementation to compute specific algorithms. Or the power consumed, or the electromagnetic radiation it emits. 

An alternative view on humans frequently being cited as  the weakest cryptography link:

<v-card variant = "tonal" class="mb-5">
    <v-card-text>
    At the end of the day, cryptography serves humans, not the other way around. “The real weakest link in a crypto system is failure to take into account how humans will interact with the system - not the human themselves.
    </v-card-text>
</v-card>

# A Breakable Unbreakable Crypto-system

<v-divider></v-divider>

One “problem” of encryption is that it can be used for nefarious means - hiding or even perpetrating illegal activities. To this end, people have discussed creating a system that is effectively unbreakable for day to day usage, but could be broken if authorized, e.g. by government or law enforcement. (Though this is itself a political question whether governments should even have this authority - what if the government is an authoritarian regime?). Putting this important question aside, let’s discuss how this might be achieved technically. 

### Backdoor
An encryption backdoor is a designed weakness in the algorithm itself that is known, but maybe hard to detect. For example, Dual_EC_DRBG. This was a pseudo random number generator used for generating keys. However, this had a weakness that allowed someone to predict the output from this generator, and thus predict the keys it would generate. 

Algorithmic backdoor methods don’t work in the 21st century anymore because they are too easy to discover. No entity has a monopoly on cryptographic knowledge that allows them to design something someone else isn’t also able to discover.

### In Practice
In practice, even without building intentional backdoors designed into the system, the real world is full of vulnerabilities, and governments have come up with many strategies to try and overcome cryptography. Including:

  1. Tracking/storing data, both encrypted or not
  2. Making agreements with individual companies to gain access to their data
  3. Hacking individual company networks
  4. Fooling a computer to using a different encryption key
  5. Using zero-day exploits

Ultimately, it seems the best way to solve this problem is still political, and not technical. People need *trust* that the government will use data responsibly, and not violate the privacy of regular citizens. In return, certain communications encryptions could be relaxed, to allow legitimate law enforcement better access so they can provide safety in return. 

# Quantum Computers

<v-divider></v-divider>

Of course we have to talk about quantum computers. First, it’s important to note what actually is and what *isn’t* going to be affected.

Asymmetric encryption and Digital Signatures. These rely on the computational difficulty of two mathematical problems, (prime factoring and finding discrete logarithms), which are difficult now, but not so difficult for a quantum computer. Losing asymmetric encryption would be pretty bad, but humanity is not without options. The solution is to re-design asymmetric encryption using an alternative computational problem that a quantum computer is not able to solve efficiently. Importantly, this new encryption algorithms must be runnable on a conventional computer. 

Symmetric encryption. This remains largely untouched. A quantum computer could perform an exhaustive key search faster than a regular computer, but not that much faster. Simply increasing the key lengths would likely be sufficient to protect symmetric encryption.

# Conclusion

<v-divider></v-divider>

And that's the book! I've only glossed over the main points, and I've skipped some of the introduction. If you are interested in learning more, I highly recommend reading through yourself. Keith explains things very well, in an easily approachable manner. 

# References

<v-divider></v-divider>

* Martin, Keith. "Cryptography: The Key to Digital Security, How It Works, and Why It Matters". W. W. Norton and Company, 2020.





  


