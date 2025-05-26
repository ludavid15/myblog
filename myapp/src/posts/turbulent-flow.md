---
title: "Turbulent Flow "
topic: "Fluid Mechanics"
path: "turbulent-flow"
author: "David Lu"
date: "2021-05-08"
preview: "In general, turbulent flow is modeled statistically. Averages values are used instead of exact ones."
---

In general, turbulent flow is modeled statistically. Averages values are used instead of exact ones. Before laminar flow becomes fully turbulent, it experiences transition. Transition begins with flow instability. The point at which a flow trips into instability (critical point) is distinct from the point at which flow transitions fully to turbulence (transition point). 

## Squire’s Law
For two-dimensional parallel flow, the minimum critical unstable Reynold’s number occurs for a two-dimensional disturbance propagating in the same direction. Really all that this Law states is that a turbulence is tripped in the direction of disturbances.

# Orr-Sommerfeld Equation

<v-divider></v-divider>

The equation describing the velocity distribution of a two-dimensional disturbance propagating in the same direction as a two-dimensional parallel flow can found to be exactly:

$$\left(U-c\right)\left(\phi^{\prime\prime}-\alpha^2\phi\right)-U^{\prime\prime}\phi+i\frac{\nu}{\alpha}\left(\phi^{\prime\prime\prime\prime}-2\alpha^2\phi^{\prime\prime}+\alpha^4\phi\right)=\ 0$$

$$\Psi\left(x,y,t\right)=\ \phi\left(y\right)exp\left(i\left[\alpha x-\beta t\right]\right)$$

$$c=\frac{\beta}{\alpha}$$

Where U is the velocity of the free stream, α is the wavenumber, c is the wave speed, and the frequency, ω = αc. The primes denote differentiation with respect to y. This is a fourth order linear differential equation. Disturbances must vanish at walls and an infinity. The temporal growth and spatial growth of disturbances are functions of the following form:

* Temporal: $f\left(Re,\ \alpha,\ c_r,\ c_i\right)=0$
* Spatial: $g\left(Re,\ \alpha_r,\ \alpha_i,\ \omega\right)=0$

Temporal neutral stability occurs when ci is equal to zero, while spatial neutral stability occurs for αi equal to zero. Instability begins at ci greater than zero. A full analytical solution of the Orr-Sommerfeld equation is non-trivial. In general, a non-dimensionalized version of the Orr-Sommerfeld equation can be written and can be plotted. 
 
### Wavenumber

The wavenumber is the waves per unit space. It is distinct from frequency, which is the waves per unit time.

### Rayleigh Inviscid Stability Theory

This is the limiting case where the viscous term in the Orr-Sommerfeld equation is neglected. In particular, the following five theorems are outlined:

* It is necessary for instability that the velocity profile have a point of inflection.
* It is further necessary for instability that the numerical value of U’ of the vorticity be a maximum at the point of inflection.
* If a point of inflection exists, it is further necessary that U’’(U-UPI) < 0 somewhere on the profile. 
* If U(y) possesses an inflection point, a neutral disturbance may exist who phase velocity is given by cr.
	The phase velocity of an amplified disturbance must always lie between the minimum and maximum values of U(y).
 

### Predicting Instability & Transition in Practice
It was found that for many different profiles and conditions, the critical transition Reynold’s number seems to depend only on the shape factor. Thus, if the shape factor can be found, one can predict the point of instability and transition. 
Several models have been proposed to find an equivalent transition point. Wazzan uses a similar approach to instability and finds a transition Reynold’s number as a function of the shape factor. There is no universal curve that accounts for free stream turbulence.

### Improving Stability
A favorable pressure gradient (decreasing pressure) delays the onset of instability, or in cases bring a flow back into stability. Boundary layers in gases are stabilized by cooling the wall, while boundary layers in liquids are stabilized by heating the wall. 

# Transition to Turbulence

<v-divider></v-divider>

The steps leading to fully developed turbulence are as follows:
* Instability
* Non-linear development waves (Tollmien-Schlichting Waves)
* Three-dimensional instability and streamwise vortices
* Formation of turbulent spots
* Fully developed turbulence

# Reynolds-Averaged Navier Stokes Equation (RANS)

<v-divider></v-divider>

These are time averaged forms of the Navier-Stokes equations. Properties of the fluid are expressed in terms of an average and fluctuation term. An especially interesting result is the resultant equation for local stress.

$$\tau=\ \mu\left[\frac{\partial\bar{u}}{\partial\bar{y}}+\frac{\partial\bar{v}}{\partial\bar{x}}\right]-\rho\bar{u\prime v\prime}$$

The first term is the laminar stress, while the second term is an equivalent turbulent “Reynolds Stress”. Importantly, note that it is independent of viscosity. This means that in regions dominated by the Reynold’s stress, viscosity of the fluid is unimportant.

## Wall Bounded Turbulent Flow

Near the wall, fluctuations must be near zero, so laminar contributions are more important. Away from the wall, turbulent stress dominates. The velocity profile from a wall then has three components, a viscous dominates inner layer, a turbulent dominated outer layer, and an overlap layer. First, we define the friction velocity:

$$v^\ast=\sqrt{\frac{\tau_w}{\rho}}$$

The average velocity and position are also re-written.

$$u^+=\frac{\bar{u}}{v^\ast}$$

$$y^+=\frac{\rho v^\ast y}{\mu}$$

The following is equation can then model the inner layer, overlap layer, and outer layer.

$$u^+=\frac{1}{k}\ln{\left(y^+\right)}+B+\frac{2\Pi}{k}f(\eta)$$

$$f\left(\eta\right)=\sin^2{\left(\frac{\pi}{2}\eta\right)}$$

Where k and B are universal constants equal to 0.41 and 5.0 respectively. The first term captures the logarithmic relationship in the overlap section, while the second capture the diverging effect in the outer layer. 
 
Very, very near the wall, viscous and laminar forces dominate. The velocity profile in this region is linear and proportional to the wall stress. It is called the viscous sublayer.

$$\tau_w=\mu\frac{\bar{u}}{\bar{y}}$$

$$u^+=y^+$$

## Turbulent Pipe Flow

Using the above model, you can actually derive an expression for the Darcy-friction factor from the flow equation. Note that this is for a smooth pipe, and so when possible, you should still reference a moody chart. In any case, the following is useful for seeing that the Darcy-Friction is not just an empirically derived fit.

$$\frac{1}{\Lambda^{1/2}}=2.0\log_{10}{\left({Re}_D\Lambda^\frac{1}{2}\right)}-0.8$$

Notably the following trends come out:

$$\tau\approx0.0396\rho^{3/4}\mu^{7/4}D^{-1/4}{U_{avg}}^{7/4}$$

## Turbulent Boundary Layers

Using the wall bounded turbulent model, the skin coefficient term can be approximated in terms of the boundary layer thickness Reynolds number. Meanwhile, the momentum thickness is evaluated by using a one-seventh power law profile taken from pipe flow data.

$$C_f=2\frac{d\theta}{dx}$$

$$\frac{\bar{u}}{U_e}\approx\left(\frac{y}{\delta}\right)^{1/7}$$

$$C_f\approx0.020{Re}_\delta^{-1/6}$$

$${Re}_\delta\approx0.16{Re}_x^{6/7}$$

# References

<v-divider :thickness="5"></v-divider>

* This post is a collection of my notes from graduate courses at the University of Michigan.