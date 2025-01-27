---
title: "Continuum Mechanics"
topic: "Fluid Mechanics"
path: "continuum-mechanics"
author: "David Lu"
date: "2021-05-11"
preview: "After writing a few sections on fluid mechanics, I decided to dedicate an entire section to Continuum mechanics. This is because one of the common assumptions we make when working with fluids is that it forms a continuum. The individual atoms of a fluid are assumed to be tightly packed enough that we can approximate the collective molecular interactions."
---

One of the common assumptions we make when working with fluids is that it forms a continuum. The individual atoms of a fluid are assumed to be tightly packed enough that we can approximate the collective molecular interactions. What are these collective molecular interactions? Well, pretty standard stuff actually. We assume that applying a force causes an object to move, or a body to deform. (Technically speaking, that stress is related to strain). And honestly well, that's kinda it. 

The reason this assumption is so powerful is because it makes our model **continuous**. This may seem pretty obvious at a glance, but working with stuff that is continuous is very different from working with stuff that is discrete! The reason as you may already have guessed: derivatives. 

Alright, so what can we do with continuums? Well, how about mass, momentum, and energy conservation? Sounds easy enough. There are two ways to do this: with either a **control mass** or **control volume**. 

* Control Mass: We define a body/mass we are interested in and track how its momentum/energy changes over time. (Notice that by definition, the total mass remains constant)
* Control Volume: We define a region of space, and take into account any mass/momentum/energy which flows in or out of this region.

# Conservation Equations for 1D Steady Inviscid Flow

<v-divider></v-divider>

Please note the assumptions required for these equations to be valid:

$$d(pu)=0$$

$$d(p+pu^2) = 0$$

$$d(h+\frac{1}{2}u^2)=0$$


## Conservation of Mass

Also known as continuity. Time rate of change of mass in the control volume (CV) is equal to the mass flux through the boundary. Or, in differential form, partial derivative of density plus mass flux is zero.

<v-card variant="tonal" class="mb-5">
    <v-card-text>Integral</v-card-text>
</v-card>

$$\frac{\partial}{\partial t}\iiint\rho dV=- \iint \rho u \bullet \hat{n} dA$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Conservative</v-card-text>
</v-card>

$$\frac{\partial\rho}{\partial t}+\nabla\bullet\left(\rho u \right)=0$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Non-Conservative</v-card-text>
</v-card>

$$\frac{D\rho}{Dt}+\nabla\bullet\left(\rho u \right)=0$$

For (quasi) 1-dimensional steady flow, the mass flow rate can be expressed as the following. This is a pretty useful and simple way to estimate things like the flow of water through a pipe or even the flow of propellant out a rocket nozzle.

$$\dot{m}=\rho AV$$

For 2D incompressible flow, we need to account for the velocity in two directions. Note that we assumed incompressibe, which results in the density term dropping out. In this case continuity is also just conservation of volume. It can be expressed as:

$$\frac{\partial u}{\partial x}+\frac{\partial v}{\partial y}=0$$

## Conservation of Momentum

Time rate of change of momentum in the CV is equal to the advection term plus forces. Or in differential form, partial of momentum with respect to time plus advection term is equal to forces acting on the fluid element. Note that the right side of the equation is the substantial derivative. You may recognize these as the Navier-Stokes equations. Or another way of thinking about it, the Navier-Stokes equations are just a statement momentum conservation.

<v-card variant="tonal" class="mb-5">
    <v-card-text>Integral</v-card-text>
</v-card>

$$\frac{\partial}{\partial t}\iiint\rho udV=- \iint u \left(\rho u\bullet\hat{n}\right)dA-\iint\left(P\hat{n}\right)dA$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Conservative</v-card-text>
</v-card>

$$\frac{\partial\rho u}{\partial t}+\left(\nabla\bullet\rho u  \right) u=-\nabla P+\rho g+\nabla\tau+F_{body}$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Non-Conservative</v-card-text>
</v-card>

$$\rho\frac{Du}{Dt}=-\nabla P+\rho g+\nabla\tau+F_{body}$$

## Conservation of Energy

Time rate of change is equal to advection term plus heat (both volumetrically and through the surface). Note that work done is encapsulated in the P/rho term in the advection integral. Or, the substantial derivative of total enthalpy is equal to time rate of change of pressure (work) and flux of heat. This is also a statement of the 1st law of thermodynamics. (Conservation of Energy).

<v-card variant="tonal" class="mb-5">
    <v-card-text>Integral</v-card-text>
</v-card>

$$\begin{align*}
\frac{\partial}{\partial t} \iiint \rho \left(e + \frac{1}{2} U^2 \right) dV 
&= - \iint \rho \left( e + \frac{P}{\rho} + \frac{1}{2} U^2 \right) u \cdot \hat{n} \, dA \\
&\quad + \iiint \rho \dot{q} \, dV \\
&\quad - \iint \dot{q}^n \cdot \hat{n} \, dA
\end{align*}$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Conservative</v-card-text>
</v-card>

$$\frac{\partial\rho e}{\partial t}+\nabla\bullet\left(u(\rho e+P)\right)=0$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Non-Conservative</v-card-text>
</v-card>

$$\rho\frac{Dh_o}{Dt}=\frac{\partial P}{\partial t}+\rho\dot{q}$$

# Conservative vs Non-conservative Form

<v-divider></v-divider>

Conservative equations are valid over discontinuities in the fluid flow. These mathematical models directly stems from applying conservation of mathematical quantities within a control volume.

Now consider the case where we take a derivative of a multivariable function. Mathematically, we can expand this derivative with the chain rule, but in doing so, we introduce terms that no longer describe a physical quantity. This is known as the non-conservative form. Most importantly, the non-conservative forms are not valid over discontinuities (i.e. shocks).

# Euler Equations

<v-divider></v-divider>

The Euler equations represent conservation of momentum when viscous forces are neglected. This is also associated with the limit as Reynold’s number approaches infinity, and the regime of potential flow theory. In this regime, the no slip boundary condition cannot be applied, instead fluid flow at the wall is always tangential to the wall. The following equations have assumed incompressible flow:

### Cartesian Coordinates

$$x:\ \ \ \ \rho\left[\frac{\partial u}{\partial t}+u\frac{\partial u}{\partial x}+v\frac{\partial u}{\partial y}+w\frac{\partial u}{\partial z}\right]=-\frac{\partial P}{\partial x}+\rho g_x$$

$$y:\ \ \ \ \rho\left[\frac{\partial v}{\partial t}+u\frac{\partial v}{\partial x}+v\frac{\partial v}{\partial y}+w\frac{\partial v}{\partial z}\right]=-\frac{\partial P}{\partial x}+\rho g_y$$

$$z:\ \ \ \ \rho\left[\frac{\partial w}{\partial t}+u\frac{\partial w}{\partial x}+v\frac{\partial w}{\partial y}+w\frac{\partial w}{\partial z}\right]=-\frac{\partial P}{\partial x}+\rho g_z$$


# Navier-Stokes

<v-divider></v-divider>

Navier-Stokes is a general statement of conservation of momentum. The form presented here includes forces due to pressure, gravity, and viscous forces, but neglects other types of forces. This form has also assumed constant density and viscosity.

### Cartesian Coordinates

$$x:\ \ \ \ \rho\left[\frac{\partial u}{\partial t}+u\frac{\partial u}{\partial x}+v\frac{\partial u}{\partial y}+w\frac{\partial u}{\partial z}\right]=-\frac{\partial P}{\partial x}+\rho g_x+\mu\left[\frac{\partial^2u}{\partial x^2}+\frac{\partial^2u}{\partial y^2}+\frac{\partial^2u}{\partial z^2}\right]$$

$$y:\ \ \ \ \rho\left[\frac{\partial v}{\partial t}+u\frac{\partial v}{\partial x}+v\frac{\partial v}{\partial y}+w\frac{\partial v}{\partial z}\right]=-\frac{\partial P}{\partial x}+\rho g_y+\mu\left[\frac{\partial^2v}{\partial x^2}+\frac{\partial^2v}{\partial y^2}+\frac{\partial^2v}{\partial z^2}\right]$$

$$z:\ \ \ \ \rho\left[\frac{\partial w}{\partial t}+u\frac{\partial w}{\partial x}+v\frac{\partial w}{\partial y}+w\frac{\partial w}{\partial z}\right]=-\frac{\partial P}{\partial x}+\rho g_z+\mu\left[\frac{\partial^2w}{\partial x^2}+\frac{\partial^2w}{\partial y^2}+\frac{\partial^2w}{\partial z^2}\right]$$


# Reynold’s Transport Theorem

<v-divider></v-divider>

States that the total time rate of change of an extensive property (B) for a system, depends on the rate of change of the intensive property in the control volume and the flux of that property through the control volume. (Extensive = mass dependent and Intensive = mass independent). In other works, it relates the control mass view of a fluid to the control volume view of a fluid.

$$\frac{DB_{sys}}{Dt}=\int_{cv}^{cv}\frac{\partial}{\partial t}(\rho b)dV+\int_{cs}^{cs}\rho b\left(\vec{v}\bullet\hat{n}\right)ds$$

# Dimensional Analysis

<v-divider></v-divider>

We can re-write an equation with normalized terms to see the relative magnitude of the different variables. For example, we can introduce a variable, keeping in mind to apply the chain rule when we take a derivative:

$$\widetilde{x}=\frac{x}{L}$$

$$\frac{\partial\widetilde{x}}{\partial t}=\frac{1}{L}\frac{\partial x}{\partial t}$$

We can then make the following substitution into the original expression

$$\frac{\partial x}{\partial t}=L\ast\frac{\partial\widetilde{x}}{\partial t}$$


# Bernoulli Equation

<v-divider></v-divider>

Ah who doesn't love Bernoullli's equation. It's so simple. We can derive Bernoulli’s equation from the conservation of energy equations (Euler equations already model adiabatic flow with no viscous forces). Assuming that the flow is also isentropic, steady, and irrotational, Euler’s equations simplify into: 

$$P+\frac{1}{2}\rho U^2+gz=constant$$

Ok, hold on, what are those assumptions again? Let's just go over those one more time: isentropic, stready, irrotational, adiabatic, inviscid.

Unsteady Bernoulli’s (applicable for irrotational flow). Where the integral of ds is taken along a streamline.

$$\int\frac{\partial\left|v\right|}{\partial x}ds+\frac{1}{2}v^2+\int\frac{\partial P}{\rho}+gz=F(t)$$


# 2D Potential Flow

<v-divider></v-divider>

Potential flow theory is the theory of inviscid fluid flow. This is also the limit where Reynold’s number tends to infinity. For two-dimensional inviscid flow, we can define the velocity components in terms of two other functions, the stream function and the potential function.

* Irrotational Velocity Potential $\phi$ 	

$$\nabla\times\vec{V}=0$$

* Incompressible Stream Function $\psi$	    

$$\nabla\bullet\vec{V}=0$$

Then the fluid's velocity component in both cartesian coordinates and polar coordinates are:

$$u=\ \frac{\partial\phi}{\partial x}= \frac{\partial\psi}{\partial y}$$

$$v=\ \frac{\partial\phi}{\partial y}=\ -\frac{\partial\psi}{\partial x}$$

$$u_r=\frac{\partial\phi}{\partial r}=\frac{1}{r}\frac{\partial\psi}{\partial\theta}$$

$$u_\theta=\frac{\partial\psi}{\partial r}=\frac{1}{r}\frac{\partial\phi}{\partial\theta}$$

If either of the following is true, we can say that the fluid is both irrotational and incompressible.

$$\nabla^2\psi=0$$

$$\nabla^2\phi=0$$

In assuming incompressibility, mass continuity reduces into a volume continuity equation, where density has dropped out:

$$Volume\ Continuity:\ \ \ \nabla\bullet V=\ \frac{\partial u}{\partial x}+\frac{\partial v}{\partial y}=0$$