---
title: "Viscous Flow"
topic: "Fluid Mechanics"
path: "viscous-flow"
author: "David Lu"
date: "2021-05-10"
---

Unlike solids, fluids deform constantly under stress (in other words, a fluid **flows**). How it flows is very much dependent on it's **viscosity**. 

<v-card variant="tonal" class="mb-5">
    <v-card-text>
    Viscosity is to fluids what the modulus of elasticity is to solids. It relates the stress (amount of force) to strain (amount of deformation). Qualitatively, viscosity is a measure of a fluid's resistence to flowing. Things like honey have a very high viscosity, while air and water have comparatively lower viscosity. 
    </v-card-text>
</v-card>

Viscous flow then, is the study of how a fluid's viscosity affects its behavior. Viscous flow covers topics like boundary layers, low-speed flows, and small-scale flows. Coincidentally, the regimes in which viscous forces dominate is often incompressible, but this is not a hard and fast rule. 


# Viscosity

<v-divider></v-divider>

The viscosity of a fluid $\mu$ defines the relationship between stress and strain. In most cases, we assume that the fluid is a Newtonian Fluid, meaning its stress and strain are related linearly. Here it is in two dimensions:

$$
\tau=\mu\left(\frac{\partial u}{\partial y}+\frac{\partial v}{\partial x}\right)
$$

$$
Friction\ Force=\mu\nabla^2\vec{V}=\nabla\tau
$$

We can also define the second coefficient of viscosity as λ.

$$
\xi=\lambda+\frac{2}{3}\mu
$$


# Reynolds Number

<v-divider></v-divider>

The ratio between viscous forces and inertial forces. The lower the Reynold's number, the more dominant viscous effects become. The Reynold's number can also show when a flow transitions from laminar to turbulent flow. Here, µ is the dynamic viscosity.

$$Re=\ \frac{\rho U_\infty L}{\mu}$$

At very low Re, we get the Stokes equations. At very high Re, we get the Euler equations (potential flow theory).

## Low Reynold’s Number Flow or Stokes Flow

This is the exact opposite regime of potential flow theory, in which viscous forces dominate over inertia forces. This is usually associated with low velocity, small scale, or highly viscous flows. Some applications can include:

* Fully developed duct flow
* Flow about immersed bodies (i.e. small particle dynamics)
* Lubrication theory
* Flow through porous media (mostly used for civil engineering)

Under the above assumption (i.e. very low Re), the momentum equation reduces to the following:

$$\nabla P\approx\mu\nabla^2V$$

### Low Reynolds Number Flow Over a Sphere

By solving stokes equations with the boundary conditions for viscous flow past a sphere (i.e. zero velocity at the wall), the following stream function can be calculated:

$$\psi=\frac{1}{4}Ua^2{sin}^2(\theta)\left[\frac{a}{r}-\frac{3r}{a}+\frac{2r^2}{a^2}\right]$$

This can be compared to the stream function found by applying potential flow theory about a sphere (i.e. flow is tangent to the wall):

$$\psi=\frac{1}{2}Ur^2{sin}^2(\theta)\left[1-\frac{a^3}{r^3}\right]$$

Solving the first equation for shear and pressure drag, we find an expression for the total drag on a sphere in the low Reynold’s number limit:

$$F=4\pi\mu Ua+2\pi\mu Ua$$

Where the first term is the viscous contribution to drag, and the second term is the pressure contribution to drag. This is normalized by the area and dynamic pressure to find the drag coefficient.

$$C_d=\frac{2F}{\rho U^2\pi a^2}=\frac{24}{Re}$$

This equation underpredicts drag for Reynold’s numbers larger than 1, since separation and wakes introduce greater pressure drag.


### Steady Flow between Infinite Plates

Another class of problem in which viscous forces dominate. We take the bottom plate to be stationary and assume some steady velocity for the top plate. There can also be a pressure gradient in the direction parallel to the plates. Due to viscosity, the motion of the top plate drags the top layer of fluid along with it. Eventually, some sort of velocity profile develops along this direction.

In the limit that the top plate’s velocity tends to zero we get a Hagen-Poiseuille flow problem (the only thing that can drive the fluid forward is a pressure gradient). In the limit that the pressure gradient tends to zero we get a Couette flow problem (velocity of the top plate drives flow). 

The general solution of the velocity profile is expressed below. The first equation is the general solution, while the second equation takes the lower wall to be stationary. Where $τ_o$ is the shear stress at the wall where y=0, and $u_o$ is the velocity at the wall where y=0.

$$u\left(y\right)=\ -\frac{1}{2\mu}\left(-\frac{dP}{dx}\right)y^2+\frac{\tau_o}{\mu}y+u_o$$

$$u\left(y\right)=\ +\frac{1}{2\mu}\left(-\frac{dP}{dx}\right)y(h-y)+U\frac{y}{h}$$

We can also solve for the volume flow rate per unit span by integrating over y.

$$Q=U\frac{h}{2}+\frac{h^3}{12\mu}\left(-\frac{dP}{dx}\right)$$


### Unsteady Flow & Infinite Plates

There are two problems within this category, known as Stokes 1st problem (an impulsively started plate) and Stokes’s 2nd problem (an oscillating plate). Unlike the previous problem, which solves for some steady state condition, these problems deal with transient situations. 

#### 1st Problem:

Stoke's first problem covers the scenario of an impulsively started plate. 

$$\frac{u(y,t)}{U}=1-erf{\left(\frac{\eta}{2}\right)}$$

$$erf{\left(x\right)}=\ \frac{2}{\sqrt\pi}\int_{0}^{x}{e^{-x^2}}dx$$ 

$$\eta=\ \frac{y}{\sqrt{\nu t}}$$

As time increases, the penetration height will increase. At infinite time, the entire fluid moves with velocity U. The above solution represents a non-dimensionalized solution, where η represents the ratio of position to penetration height scaling.


#### 2nd Problem:

Motion of the bottom plate is defined as the following:

$$U\left(t\right)=\ U_o\cos(\omega t)$$

The velocity profile above the plate and the stress at the wall can be solved to show the following:

$$u\left(y,t\right)=U_oe^{-y\sqrt{\frac{\omega}{2v}}}cos\left(\omega t-y\sqrt{\frac{\omega}{2v}}\right)$$

$$\tau_{wall}=\mu\frac{\partial u}{\partial y}=U_o\sqrt{\rho\mu\omega}sin\left(\omega t-\frac{\pi}{4}\right)$$

The amplitude of the velocity oscillation decreases with distance from the plate. The ratio of viscosity to frequency determines the penetration height. Note that this ratio also affects a phase lead/lag, which changes with height, represented within the cosine term.


# Pipes

<v-divider></v-divider>

Although infinite plates are useful for understanding some of the concepts, they aren't exactly reflective of real life. What we do see plenty of though, is flow through pipes. 

## Hagen-Poiseuille Circular Pipe Flow Model

Pressure driven viscous pipe flow. Given L is the length of pipe, Q is the volume flow rate, and some known diameter, we can find the pressure drop. Assumes laminar flow.

$$∆P= 8μLQπR4$$

$$u\left(r\right)=\ -\frac{1}{4\mu}\left(-\frac{\partial P}{\partial x}\right)\left(r_o^2-r^2\right)$$

$$Q=\ \frac{\pi R^4}{8\mu}\left(\frac{\partial P}{\partial x}\right)$$

$$C_f=-\frac{\tau_w}{\frac{(1}{2})\rho{U_{ave}}^2}=\frac{16}{Re_D}$$

Note that this may not be valid for short pipes, flow near the entrance, and fluids with low viscosity, or flow in a wide pipe. If flow is turbulent, you should switch over to the Darcy-Weisbach approach.

## More Realistic Pipe Flow Analysis

For flow (both laminar and turbulent) in a pipe of constant diameter D, we can express the pressure across a given length as:

$$\frac{∆P}{L}=f_d\frac{(1/2)ρU^2}{D}$$

Where fd is the Darcy friction factor. In the laminar regime, the Darcy Friction factor is equal to $\frac{f_D=64}{Re}$. For turbulent regime values, the friction factor is dependent on the surface roughness. Look up results in a Moody Diagram.

> To be inserted, Moody Diagram

More commonly, pressure loss per unit length is replaced with head loss per unit length, S, where head loss is calculated as:

$$∆h= ρg∆P$$

$$S=\frac{∆h}{L}=f_d\frac{1}{2g}\frac{V^2}{D}$$

Note that the friction factor in the turbulent regime can be calculated with turbulent flow theory and is not simply an empiric fit!

## Colebrook Interpolation Formula for Turbulent and Transition Regime

Provides an easy way to find the friction factor for a given surface roughness and Reynold’s number. $\Lambda$ here is the friction factor.

$$\frac{1}{\Lambda^{1/2}}\approx-2.0\log_{10}{\left(\frac{k/D}{3.7}+\frac{2.51}{Re_D\sqrt\Lambda}\right)}-0.8$$

### Hydraulic Diameter

For non-circular pipes, an equivalent diameter can be found, known as the hydraulic diameter. This allows you to analyze the pipe as if it were circular.


$$\rho\left(\frac{\partial u_e}{\partial t}+u\frac{\partial u_e}{\partial x}\right)=-\frac{\partial P}{\partial x}$$


# Boundary Layers

<v-divider></v-divider>

Boundary layers are an incredibly important phenomena arising due to viscous forces. As before, we require that the velocity of the fluid at the wall is equal to the velocity of the wall. Only through BL analysis can we determine things like the lift, drag, and heat flux of objects moving through a fluid (such as a wing).

For now, we'll focus on laminar boundary layers, however, it is possible for something known as **Boundary Layer Separation** to occur. When this happens, the fluid ceases to flow past objects in a nice smooth fashion, and trips into turbulent flow. This leads to the topic of **Tubulent Boundary Layer**, which is a whole other beast. 


## 2D Boundary Layer Similarity Solutions

In most cases, it is easier to create the following similarity variables, defined using the velocity potential:

$$u=\ \frac{\partial\psi}{\partial y}$$

$$v=-\frac{\partial\psi}{\partial x}$$

$$\psi\left(y,x\right)=\ U_\infty l\left(x\right)f(\eta)$$

$$\eta=\frac{y}{l(x)}=\frac{y}{x}\sqrt{\frac{Ux}{v}}=\frac{y}{x}\sqrt{Re}$$

$$l\left(x\right)\cong\ \sqrt{\frac{\nu x}{U_\infty}}$$

Here, $l(x)$ is proportional the height of the boundary layer, making $η$ a normalized value for our position in the boundary layer. In addition, $f(η)$ and $η$ are both dimensionless. We should also be able to see that:

$$f\left(\eta\right)\cong \psi$$

$$f^\prime\left(\eta\right) \cong u,\ v$$
 
$$f^{\prime\prime}\left(\eta\right)\cong \tau$$

Re-writing the Prandtl boundary layer equations in terms of our similarity variables, we find an exact solution:

$$\dddot{f}\left(\eta\right)+f\left(\eta\right)\ddot{f}\left(\eta\right)=0$$

## Falkner-Skan 2D Solution

The Falkner-Skan solution describes boundary layer flow over a wedge. It is a generalization of the Blasius flat plate boundary layer. Using the same similarity definition as above, the exact solution takes the following form. As with the Blasius solution, a numerical approach is required to find a solution.

$$\dddot{f}+f\ddot{f}+\beta(1+{\dot{f}}^2)=0$$
 
The velocity in the free stream (i.e. ur in the direction of πB) can be represented by the following equation, as a function of the turning angle:

$$u_e=Kx^m$$

$$\beta=\frac{2m}{1+m}$$

In the limiting case where B = 0, you get the Blasius flat plate general solution. In the limit that B = 1, you get stagnation point flow. There are tabulated values for the velocity thickness, displacement thickness, momentum thickness, and friction coefficient for a range of B values.

 
## Blasius Solution a 2D Flat Plate or 1st Order Solution

The Blasius solution is an exact differential solution of the boundary layer equations for flow over a flat plate, however, solving it requires a numerical approach. 

$$\frac{\delta}{x}=\frac{5}{\sqrt{Re}}$$

$$\frac{\delta^\ast}{x}=\frac{1.72}{\sqrt{Re}}$$

$$\frac{\theta}{x}=\frac{0.664}{\sqrt{Re}}$$

$$c_f=\frac{0.664}{\sqrt{Re}}$$

## Approximate Solutions to 2D Boundary Layer

Thwaites method uses the Von-Karman integral equations to approximate the boundary layer characteristics. The Von Karman integral relation (steady flow with impermeable wall):

$$\frac{c_f}{2}=\frac{d\theta}{dx}+(2+H)\frac{\theta}{U}\frac{dU}{dx}$$

This equation is still an exact relationship. Thwaites method is to make the following approximation: (where P(x) is any generic function of x, and is there to characterize the changes in the velocity profile shape in the boundary layer as a function of the x position)

$$u(x,y)\approx U\left(x\right)f(\eta,P\left(x\right))$$

In the case of Thwaites method, the following parameter is defined:

$$\lambda=\left(\frac{\theta}{\delta}\right)^2\frac{\delta^2}{v}\frac{dU_e}{dx}=\frac{\theta^2}{v}\frac{dU_e}{dx}$$

The Von-Karman integral relation can then be re-written, and we see that the terms of the original expression are going to be proportional to the parameter defined above.

$$\frac{\tau_w\theta}{\mu U}=\frac{U\theta}{v}\frac{d\theta}{dx}+(2+H)\frac{\theta^2U^\prime}{v}$$

$$\frac{\tau_w\theta}{\mu U}\approx Shear\ Factor\ Correlation=S(\lambda)$$

$$H=\ \frac{\delta^\ast}{\theta}\approx Shape\ Factor\ Correlation=H(\lambda)$$

For an external flow problem, the following expression for momentum thickness can be derived:

$$\theta^2=\frac{0.45v}{U_e^6(x)}\int_{0}^{x}{U_e^5(x\prime)}dx\prime$$

The displacement thickness can be solved by using the following shape factor correlation, as a function of λ. 

$$\delta^\ast=\theta H\left(\lambda\right)$$

$$H\left(\lambda\right)=2+4.14z-83.5z^2+854z^3-3337z^4+4576z^5$$

$$z=0.25-\lambda$$

The laminar boundary layer separates when $λ = -0.09$. 

### Pressure Gradient Effects

There are three regimes for the pressure gradient term: favorable (less than zero), adverse (greater than zero), and neutral (equal to zero). 
 
An adverse pressure gradient can cause boundary layer separation. Separation occurs at the point where the wall shear stress is equal to zero (slope of the velocity profile is zero), that is:

$$\tau_w=\mu\frac{du}{dy}=0$$

# Miscellaneous Cases

<v-divider></v-divider>

## Axis-Symmetric 3D Boundary Layers

The boundary layer equations for an axisymmetric steady flow without swirl can be shown to be equal to the following:

<v-card variant="tonal" class="mb-5">
    <v-card-text>
    Axisymmetric steady flow without swirl: in other words, flow only occurs in the radial or axial direction, and never in azimuth.  
    </v-card-text>
</v-card>

$$\frac{\partial(r_ou)}{\partial x}+r_o\frac{\partial v}{\partial y}=0$$

$$\rho\left(u\frac{\partial u}{\partial x}+v\frac{\partial u}{\partial y}\right)=\rho u_e\frac{\partial u_e}{\partial x}+\mu\frac{\partial^2u}{\partial y^2}$$

The above equations can be transformed into an equivalent set of 2D boundary layer equations with the Mangler Transformation of the coordinate frame.

## Fanno Flow

Associated with one dimensional flow with friction. Friction tends to drive flow eventually towards sonic conditions, regardless of whether flow starts out subsonic or supersonic. Given conditions at a point (1) in a pipe, you can solve for the sonic conditions (*). If you then know something about conditions at another point (2), you can use the sonic conditions to backtrack and find all other properties at that second point. In a Fanno flow table, you will usually find the following relations:

$$M_1\ \ \ \ \ \frac{fL}{D}\ \ \ \ \ \frac{P}{P^\ast}\ \ \ \ \ \ \frac{T}{T^\ast}\ \ \ \ \ \ \frac{P_0}{P_0^\ast}$$

## Rayleigh Flow

Like Fanno flow, where heat addition tends to drive flow towards sonic conditions, regardless of initial velocity. Knowing heat input can allow you to find change in total temperature between two points. From there you can backtrack and solve for all other properties at those two points like how you would do it for Fanno flow.

$$T_{t,2}=\frac{q}{c_p}+T_{t,1}$$

## Laminar Free Stream Shear Flow (Jets, Wakes, Mixing Layers) 

A class of problems involving a large unbounded region and either excess momentum (i.e. a jet or plume) or a momentum deficit (i.e. wake). This section will be completed at a later date. 

## Drag Acting on a Body in a Uniform Stream

$$D = \int{\rho u (U_{\infty}-u)}dS$$
