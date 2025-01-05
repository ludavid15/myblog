---
title: "Compressible Flow "
topic: "Fluid Mechanics"
path: "compressible-flow"
author: "David Lu"
date: "2021-05-09"
---

While viscous flow deals with flows that are very slow, compressible flow is for your rockets and airplanes. In this Reynold's number regime, the density of a fluid cannot assumed to be constant, but luckily we can ignore viscous effects. One easy way to group topics in compressible flow is into 1D compressible flow, and everything else. This is because you'll often find 1D compressible flow topics in an introductory fluid mechanics course. 

# Stagnation Properties

<v-divider></v-divider>

For any steady state fluid in motion, we can define stagnation/total properties. These reflect the actual values if the fluid were brought to rest isentropically. 

$$\frac{T_{Total}}{T}=\ \left(\frac{P_{Total}}{P}\right)^\frac{\gamma-1}{\gamma}=\left(\frac{\rho_{Total}}{\rho}\right)^{\gamma-1}=1+\left(\frac{\gamma-1}{2}\right)M^2$$

Note that the stagnation properties are frame dependent and thus not intrinsic thermodynamic properties.

# Waves

<v-divider></v-divider>

In the context of fluid dynamics, a wave is simply a disturbance which propagates. This disturbance can have many properties and effects on the fluid as it passes through:

* It can increase/decrease a property of the fluid (density, pressure, etc.)
* It can change the velocity of the fluid
* The magnitude of the change can be large or small
* The shape of the disturbance can be continuous or discontinuous
* It can be isentropic/increase entropy
* It can propagate faster than the local acoustic speed or at the acoustic speed.

By this definition, a shock is a type of wave. Although shocks are often introduced as “stationary” objects, this is because we have shifted our frame of reference such that this the case. A shock can be stationary (like at the inlet of a ramjet), or a shock can propagate (like out from an explosion). 


<v-card variant="tonal" class="mb-5">
    <v-card-text>
    Another way to think of waves is as the propagation of information. Here's an example you might be familiar with: take a water droplet hitting the surface of a pond. Waves carry information about the event (the falling water) outwards. The speed at which the wave moves out is the speed at which this information is carried. Every fluid has a local "acoustic speed" or speed of sound. This is the maximum speed at which waves can propagate. So here's a question for you, what happens when a disturbing event (like an airplane) moves faster than the local speed of sound? 
    </v-card-text>
</v-card>

### Acoustic Wave Theory

An acoustic wave is the propagation of wave with small magnitude through a medium. This wave travels at the local acoustic speed of the medium and is adiabatic (i.e. the energy of the medium before and after the wave has passed through remains constant). Given the initial conditions about the displacement and rate, the solution for the propagation of that disturbance can be found (d’Alembert’s Formula). 

$$∆p(x,t=0)=f(x)$$

$$\frac{∂∆p}{∂t}(x,t=0)=g(x)$$

$$∆p(x,t)=\frac{f(x)-a_∞t+f(x+a_∞t)}{2}+\frac{1}{2a_∞} \int_{x-a_∞t}^{x+a_∞t} gs \ ds$$

The fundamental result is that the initial disturbance splits into a left running and right running portion. The fluid velocity, pressure and density can also be related to one another.

$$∆u= ±\frac{a_∞}{ρ_∞}∆ρ$$

$$∆ρ= ±\frac{1}{a_∞^2}∆P$$

$$∆ρ= ±\frac{1}{ρ_∞a_∞}∆P$$

In deriving the above equation, we’ve assumed small amplitudes, meaning that the local speed of sound remains constant through the disturbance. If we remove this assumption, the local speed at which the disturbance propagates will be proportional to the magnitude and shape of the disturbance. This leads to finite strength waves and the method of characteristics.


# Method of Characteristics

<v-divider></v-divider>

Alright here's where it get complicated. It turns out that when we no longer assume a constant speed of sound, the equations are a tad unsolvable as they are. To this end, mathemeticians have defined a way around this. Instead of solving the entire system for every point in space, we can define some *characteristic lines*. We can apply a constraint (i.e. some property is constant along the line), and this gives us the final equation we need to solve the system. Then if we define many lines, we can nearly cover the entire region we are solving for. By applying constraints at their intersection points, we can solve a big system of equations and have an approximate solution to our problem.

**1D Unsteady MOC**

More details incoming!

**2D Steady MOC**

More details incoming!

**Minimum Length Nozzle Calculation using MOC**

With MOC, it is possible to design a nozzle such that the local curvature exactly cancels any incident expansion waves (these result from the diverging section right after the throat). 
 
# Shocks

<v-divider></v-divider>

Shocks occur when objects travel faster than the acoustic speed of the fluid it's in (speed measured relative to the fluid). This leads to a sudden discontinuity in the fluid's properties as it transitions from supersonic to subsonic velocities. 

## Normal Shocks

Across a normal shock: total temperature remains constant, total pressure decreases, but static pressure and static temperature increase. Density increases, speed decreases. 
Derivation of Normal Shock Equations:

* Continuity Equation: 				$\rho_1u_1=\rho_2u_2$
* Momentum Conservation Equation:		${P_1+\rho}_1{u_1}^2=P_2+\rho_2{u_2}^2$
* Energy Conservation Equation		$h_1+\frac{1}{2}u_1^2=h_2+\frac{1}{2}u_2^2$
* Ideal Gas Law					$PV=nRT$
* Calorically Perfect Gas Assumption		$h=\ C_pT$

The above represents 5 equations with 5 unknowns (assuming we know the properties at state 1, upstream of the shock). They can be solved to show the following equations:

$$\frac{P_2}{P_1}=1+\frac{2\gamma}{\gamma+1}\left(M_1^2-1\right)$$

$$\frac{T_2}{T_1}=\left[1+\frac{2\gamma}{\gamma+1}\left(M_1^2-1\right)\right]\left[\frac{2+(\gamma-1)M_1^2}{(\gamma+1)M_1^2}\right]$$

$$\frac{\rho_2}{\rho_1}=\frac{u_1}{u_2}=\frac{(\gamma+1)M_1^2}{2+(\gamma-1)M_1^2}$$

$${M_2}^2=\frac{1+\frac{\gamma-1}{2}M_1^2}{\gamma M_1^2-\frac{\gamma-1}{2}}$$


## Oblique Shocks

Supersonic flow over an angle. From the conservation equations, there are two equally valid solutions to an oblique shock problem, a strong solution and a weak solution. It is also possible that for a given combination of turning angle and incoming Mach number, there is no solution. Instead, the oblique shock becomes a detached or bow shock.
 
$$M_{n,1}=M_1\sin{\left(\sigma\right)}$$

$$M_2=\ \frac{M_{2n}}{\sin(\sigma-\delta)}$$

$$\tan{\left(\delta\right)}=2\cot(\sigma)\left[\frac{M_1^2{sin}^2\left(\sigma\right)-1}{M_1^2\left(\gamma+cos\left(2\sigma\right)\right)+2}\right]$$

Unless there is some downstream flow feature to support the strong shock, the weak solution is typically what develops. 
The presence of a shock introduces a sudden change in the fluid properties, including pressure. This leads to the creation of wave drag.
 
There are some important takeaways from the above figure. 
* The red line denotes the maximum shock wave angle that is possible for a given incoming Mach number and deflection angle. If either one is increased while the other is kept constant, the shock will detach.
* After a strong shock, the fluid is always subsonic.
* fter a weak shock, the fluid can be either subsonic OR supersonic. This is the region bounded by the red and blue dotted lines.
* The strong limit is the normal shock.

## Detached Shock

The detached or bow shock is just an oblique shock problem in which a range of deflection angles (0 to 90 degrees) are present. At the centerline, fluid flow is perfectly perpendicular to the bow shock, and so it is treated as a normal shock. Traveling away from the center, the fluid flow has velocity partially parallel to the shock. This is equivalent to an oblique shock at some deflection angle. Infinitely far away, the deflection angle reaches 0 degrees and hence no shock develops.

Notice that there are two regions behind the bow shock, a subsonic flow region, and a supersonic flow region. The dividing line between these two regimes is defined by the point along the bow shock where M2 = 1, or the blue dotted line in the figure above. 

## Expansion Fans
The exact opposite of an oblique shock, in which the boundary curves away from the flow direction. An expansion fan is formed as a continuous spread of Mach/Acoustic waves, each providing some infinitesimal change to the fluid properties. Thus, flow through an expansion fan is isentropic. 

## Prandtl-Meyer Function
The flow angle can be related to the local Mach number by applying continuity and conservation laws across an expansion wave. The resulting expression is the Prandtl-Meyer Function.

$$\theta_2-\theta_1=v\left(M_2\right)-v(M_1)$$

$$v\left(M\right)=\ \sqrt{\frac{\gamma+1}{\gamma-1}}arctan\sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)}-arctan\sqrt{M^2-1}$$

## Reflections

At a solid boundary, waves reflect in a like manner. That is, a shock reflects as a shock, and an expansion wave reflects as an expansion wave. This maintains the kinematic constraint that flow near a wall must be parallel to it (i.e. no penetration). At a free boundary, waves reflect in opposite manners. A shock reflects as an expansion wave, while an expansion wave reflects and converges as a shock. Across a free boundary, the pressure must be equal, and the flow in both regions must be parallel.

### Interactions of Shockwaves

TBD 

### Expansion Wave Interactions (Method of Characteristics)

TBD

# Compressible Boundary Layers

<v-divider></v-divider>

The key feature of compressible boundary layers is that temperature and enthalpy changes cannot be decoupled from the velocity profile. Thus, even if the wall is adiabatic, the flow itself is neither adiabatic or isentropic (viscous dissipation). Consider the steady case where Prandtl number is equal to 1 (not a bad assumption with gases). This is also known as the Crocco-Busemann Relations.

$$\Pr{=\ \frac{\mu C_p}{k}}$$

For an arbitrary pressure gradient, the temperature distribution takes the following form. This condition is satisfied for isentropic flow outside the boundary layer.

$$T=T_e\left[1+\frac{\gamma-1}{2}M_e^2\left(1-\frac{u^2}{U_e^2}\right)\right]$$

For this scenario, the adiabatic wall temperature is equal to the stagnation temperature of the free stream. Recovery factor is 1. 

The second scenario is for zero pressure gradient.

$$T-T_w=\left(T_{oe}-T_w\right)\frac{u}{U_e}-\frac{u^2}{2C_p}$$

The similar solution to the adiabatic wall temperature can be found for cases of Prandtl number larger than one with the following expression.

$$T_{aw}=T_e\left[1+\frac{\gamma-1}{2}\sqrt{Pr}M_e^2\right]$$

### Adiabatic Wall Temperature

This is the wall temperature for a fluid flow such that there is no net heat transfer into or out of the wall. If a system is let to run until equilibrium, this is the steady state temperature the immersed object will reach. 