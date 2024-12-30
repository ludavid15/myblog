---
title: "Astrodynamics"
topic: "Aerospace"
path: "astrodynamics"
author: "David Lu"
date: "2024-12-10"
---

Astrodynamics is a lot like any other field of dynamics, except we now have an additional equation to consider: the law of universal gravitation. This leads to some strange and counterintuitive results - like slowing down to catch up! 

### Kepler’s Laws of Planetary Motion

As good a place to start as any. These are more a set of observations than a theoretical explanation for celestial motion.

1.	All planets move in elliptical orbits, with the Sun at the focus.
2.	A line that connects a planet to the Sun sweeps out equal areas in equal times.
3.	The period of an orbit is proportional to the root of the cube of the semimajor axis.

# 2D Orbits

<v-divider></v-divider>

The two-dimensional orbital frame is also known as the perifocal frame (i.e. periapsis and apoapsis vectors are in the plane). We also assume that one body is significantly larger than the other. Given θ as the true anomaly of your orbit, the orbital radius from a focus point is:

$$r=\ \frac{h^2}{\mu}\frac{1}{1+e\cos(\theta)}$$

Where µ is the gravitational parameter of the larger body being orbited. Standard values for objects in our solar system can be found [here](https://en.wikipedia.org/wiki/Standard_gravitational_parameter).

For each orbit, we can also define the specific angular momentum $\vec{h}$:

$$\vec{h}=\vec{r}\times\vec{v}$$

Where $\vec{r}$ and $\vec{v}$ are the position vector and velocity vector at a point in time. The total angular momentum remains constant through the orbit. If the orbit is elliptical, we can define an apoapsis distance, periapsis distance, and semimajor axis distance.

$$2a=\ r_a+r_p$$

The eccentricity (measure of how elliptical an orbit is) can also be calculated with:

$$e=\ \frac{r_a-r_p}{r_a+r_p}$$

### Specific Orbital Energy

As with most things, the total energy is the sum of kinetic and potential energy. For an orbit, these two terms are going to be:

$$\varepsilon = \frac{v^2}{2} - \frac{\mu}{r} = -\frac{\mu}{2a}$$

Notice that the kinetic energy is a positive term, while the potential energy is a negative term. An orbit with a specific energy of zero is defined to be on a parabolic orbit. A positive specific energy means that it is on an escape trajectory, while a negative value means it is captured by the planet’s gravity (circular or elliptical). 

## Vis Viva Equation

This equation relates the current velocity and radius of an object in orbit to the specific orbital energy, or semi-major axis of it's orbit. This is very useful for computing Hohman transfers.

$$\frac{v^2}{2}-\frac{\mu}{r}=-\frac{\mu}{2a}=\varepsilon$$

This equation shows us that velocity and radius are inversely related. In other words, we move fastest at periapsis, and slowest at apoapsis. Or, if we hold radius constant, increasing velocity increases the semi-major axis. 

### Orbital Period

The orbital period is the total time is takes to complete a single revolution

$$\left(T\right)=2\pi\sqrt{\frac{a^3}{\mu}}$$

Using the energy equation, we can show that for a circular orbit, where r = a, the circular orbit velocity is simply:

$$V=\ \sqrt{\frac{\mu}{r_1}}$$

### Retrograde & Prograde

A prograde orbit means that we move in the same direction as the rotation of the planet/star we're around. This is also the easier orbit to launch into, in terms of fuel cost.

Retrograde is the opposite, where the orbital motion and rotation of the central body are in different directions. 

### Catching up Example

Consider a situation in which you are trailing some target, but the two of you are in the same orbit. How do you catch up? If you increase your velocity to "catch up", you're going to increase the semi-major axis of your orbit. Now you're on a different trajectory, *and* it'll take you longer to complete a single orbit than your target. The next time around, you'll be even further behind. 

The correct answer is, unintuitively, to slow down. By slowing down, we lower our orbit, which means we'll complete it faster. When we come back around, we'll have caught up with our target, at which point we can increase our velocity again to restore ourselves to the original trajectory. A drawback of this strategy is that we must complete an entire orbit. This is perhaps not so bad in LEO, where orbits take 90 minutes, but this isn't something we'd want to do with Pluto's 200+ year orbit around the Sun. 


# Thinking in 3D

<v-divider></v-divider>

Although the orbital plane (perifocal frame) is two-dimensional, the plane itself lives in a three dimensional universe. To define this plane, we need to define a few variables.

### Reference Frame

For Earth orbits, two of the most common reference frames are Earth Centered Inertial (ECI), and Earth Centered Earth Fixed (ECEF). ECI is fixed, while ECEF rotates with the Earth. 

### Inclination

The inclination is the angle formed by the orbit plane, and the reference plane. Along with the right ascension of the ascending node (RAAN), these two values are necessary and sufficient to define the orbital plane's position. 

### Orbital Nodes

The orbital nodes are the two points where the orbit crosses the reference plane. This occurs on the line formed by the intersection of these two planes. The node at which the satellite crosses into the northern hemisphere is called the ascending node, and the node at which the staellite crosses back into the southern hemisphere is called the descending node. The angle formed by the ascending node and the reference frame is known as the Longitude of the Ascending Node, or sometimes called the right ascension of the ascending node (RAAN). 

### Argument of Periapsis

The argument of periapsis determines the orientation of the ellipse **within** the orbital plane. This is the angle formed by the the line to periapsis and your reference. 


# Lagrange Points

<v-divider></v-divider>

A lagrange point is a stable orbit position where the gravitional pull and centrifugal force from two other bodies is at an equilibrium. In a three-body system, there are 5 lagrange points. 

> The James Webb Space Telescope is at the Earth-Sun Lagrange point L2!
