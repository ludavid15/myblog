---
title: "Jet Engines"
topic: "Aerospace"
path: "jet-engines"
author: "David Lu"
date: "2021-05-06"
preview: "Alright, let's talk about jet engines. Why are they everywhere? What's the big deal? What happened to propellers!?"
---

Alright, let's talk about jet engines. Why are they everywhere? What's the big deal? What happened to propellers!? For the sake of simplicity, jet engines can be analyzed as a quasi 1 dimensional system. In other words we only need to consider velocities in one direction. This makes our math much easier. 

Before we go further, though, it's important to define a key concept that plays a central role in understanding jet engine performance: Thrust Specific Fuel Consumption (TSFC). TSFC measures the amount of fuel consumed per unit of thrust and is sometimes referred to simply as Specific Fuel Consumption (SFC). This metric is crucial for evaluating the efficiency of a jet engine and comparing it to other propulsion systems.

# Fundamentals

<v-divider></v-divider>

Most of these equations are rooted by a fairly simple conservation of energy/momentum principle. Hence, we can expect to see a lot of energy $v^2$ and momentum $\dot{m}v$ terms

$$F_{uninstalled}=\dot{m_9}u_9-\dot{m_0}u_0-A_{exit}(P_9-P_0)$$

$$F_{gross}=\dot{m_9}u_9-A_{exit}(P_9-P_0)$$

$$\mathrm{TSFC}=\ \frac{\dot{m_f}}{T}=\frac{1}{g Isp_f}=\frac{f}{g Isp_{air}}$$

## Combustion

Combustion is still the driving force behind all jet engines. The energy added to the air gets converted into kinetic energy by a nozzle, thereby producing thrust. 

$$C_xH_y+\left(x+\frac{y}{4}\right)\left(O_2+{3.76N}_2\right)\leftrightarrow xCO_2+\left(\frac{y}{2}\right)H_2O+(x+\frac{y}{4})N_2$$

$$\phi=\ \frac{f}{f_{stoich}}$$

$$f_{stoich}=\ \frac{M_{Fuel}}{(x+\frac{y}{4})(M_{O2}+3.76M_{N2})}$$

Combustion does not always happen to completion and fuels are not made of a singular type of hydrocarbon. This means that as equivalence ratio tends to 1, actual flame temperature is lower than the ideal value. 


$$\phi<1	 \ Fuel Lean$$

$$\phi=1	 \ Stoichiometric$$

$$\phi>1	 \ Fuel Rich$$

## Adiabatic Flame Temperature

The adiabatic flame temperature is the maximum temperature that a combustion system can achieve if no heat is lost to the surroundings and all the energy released by the reaction is used to heat the products. This temperature depends on the composition of the reactants, the initial conditions, and the thermodynamic properties of the substances involved. This upper limit provides a benchmark for analyzing combustion efficiency and system design.

$$Q_R=Energy\ gained\ in\ combustion=\sum{(nh_{f,\ products})}-\sum{(nh_{f,\ reactants})}$$

$$Q_R+{\sum{nc_p(T_2-T_f)}}_{Products}=\ {\sum{nc_p(T_1-T_f)}}_{Reactants}$$

In other words, energy is released by combustion reaction, and this energy goes into heating up the products. Note that for the above equation we assume that cp does not vary with temperature (even though it does!).


# Ideal Turbojet Cycle

<v-divider></v-divider>

For each stage in a turbojet, we can abstract the relative change in temperature and pressure of air passing through. In this way, if we know the initial conditions of incoming air, we can easily find the temperature and pressure at any stage. Of note, we are comparing stagnation temperatures and stangation pressures (since this a measure of the "total" energy.)


<v-card variant="tonal" class="mb-5">
    <v-card-text>Step 1: Diffuser</v-card-text>
</v-card>

$$\pi = 1  \ \ \ \ \ \ \ \ \ \ \ \ \  \tau=1$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Step 2: Compressor</v-card-text>
</v-card>

$$\pi = {\tau_c}^{\gamma/(\gamma-1)}  \ \ \ \ \ \ \ \ \ \ \ \ \ \tau_c$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Step 3: Burner</v-card-text>
</v-card>

$$\pi = 1  \ \ \ \ \ \ \ \ \ \ \ \ \  \tau_b$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Step 4: Turbine</v-card-text>
</v-card>

$$\pi = {\tau_t}^{\gamma/(\gamma-1)}  \ \ \ \ \ \ \ \ \ \ \ \ \ \tau_t$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>Step 5: Nozzle</v-card-text>
</v-card>

$$\pi = 1  \ \ \ \ \ \ \ \ \ \ \ \ \  \tau=1$$


Where τ & π are defined as the ratio of stagnation temperatures and pressures across the stage. The relationship between pressure ratio and temperature ratio is established by assuming assumed isentropic processes. We also define a unique value called the recovery temperature/pressure ratio, which is the ratio of stagnation temperature/pressure to local temperature/pressure at station 0.

$$\frac{T_{t0}}{T_0}=1+\frac{\gamma-1}{2}M^2=\ \tau_r$$

$$\tau_\lambda=\tau_r\tau_c\tau_b=\frac{T_{t4}}{T_0}$$

Note that for an ideal turbojet without an afterburner, the ratio of outlet state temperature to inlet temperature is the same as burner temperature ratio.

$$\tau_b=\frac{T_9}{T_0}$$

$$Isp_{air}=\ \frac{a_0M_0}{g}\left(\sqrt{\frac{\tau_b(\tau_r\tau_c\tau_t-1)}{\tau_r-1}}-1\right)=\frac{T}{\dot{m_0}g}$$

Assuming all fuel is burned in combustor, where f is the fuel to air ratio.

$$f=\ \frac{c_pT_0}{Q_R}\tau_r\tau_c(\tau_b-1)$$

Also, if turbine work is equal to compressor work:

$$\tau_r=\ \left[1-\frac{\tau_c-1}{\tau_c\tau_b}\right]$$

$Isp_{air}$ for an ideal turbojet can then be solved if we are given the recovery temperature ratio, compressor ratio and the maximum temperature at station 4 after the burner. 

$$Isp_{air}=\ \frac{a_0M_0}{g}\left(\sqrt{\frac{1}{\tau_r-1}\left[\tau_\lambda\left(1-\frac{1}{\tau_r\tau_c}\right)-\tau_r(\tau_c-1)\right]}-1\right)$$

We can also find the ratio of outlet to inlet velocity

$$\frac{u_9}{u_0}=\ \left(\frac{M_9}{M_0}\right)\sqrt{\frac{\gamma_9R_9T_9}{\gamma_0R_0T_0}}=\ \sqrt{\frac{\tau_b(\tau_r\tau_c\tau_t-1)}{\tau_r-1}}$$

Which can be found by first realizing that the following holds true

$$\left(\frac{P_{t9}}{P_9}\right)^\frac{\gamma-1}{\gamma}=\frac{T_{t9}}{T_9}=\ \frac{T_0}{T_9}\tau_r\tau_d\tau_c\tau_b\tau_t\tau_n$$

# Engine Efficiencies

<v-divider></v-divider>

These are weights which represent the % of energy lost.

**Propulsive Efficiency**

A measure of kinetic energy efficiency.

$$\eta_p=\frac{P_{prop}}{P_{KE}}\cong\frac{2\frac{u_o}{u_e}}{1+\frac{u_o}{u_e}}$$

**Thermal Efficiency**

A measure of thermal energy efficiency.

$$\eta_{th}=\frac{P_{KE}}{P_{in}}=\frac{\left\{\left(\dot{m_0}+\dot{m_f}\right)\frac{ u_e^2}{2}-\dot{m_0}\frac{ u_0^2}{2}\right\}}{\dot{m_f}Q_R}=1-\frac{T_9-T_0}{T_{t4}-T_{t3}}=1-\frac{1}{\tau_r\tau_c}$$

Combining all these terms yields the total efficiency:

$$\eta_0=\eta_{th}\eta_p=\frac{P_{Prop}}{P_{in}}=\ \frac{Thrust\ast u_0}{\dot{m_f}Q_R}$$

## Real Component Analysis

<v-divider></v-divider>

These efficiency terms calculate losses at each engine stage (since nothing can truly be 100% efficient in real life).

$$\eta_d=\ \frac{\left(\frac{P_{t2}}{P_0}\right)^\frac{\gamma-1}{\gamma}-1}{\frac{\gamma-1}{2}{M_0}^2}$$

$$\eta_c=\ \frac{\left(\pi_c\right)^\frac{\gamma-1}{\gamma}-1}{\tau_c-1}$$

$$\eta_b=\frac{c_pT_0}{Q_Rf}\tau_r\tau_c(\tau_b-1)$$

$$\eta_t=\ \frac{\left(\pi_c\right)^\frac{\gamma-1}{\gamma}-1}{\tau_c-1}$$

$$\eta_t=\ \frac{\left(NPR\frac{P_0}{P_9}\right)^\frac{\gamma-1}{\gamma}-\left(\pi_n\right)^\frac{\gamma-1}{\gamma}}{\left(NPR\frac{P_0}{P_9}\right)^\frac{\gamma-1}{\gamma}-1}\ \ \ \ \ \ \ \ \ \ \ \ NPR=\ \frac{P_{t5}}{P_0}$$

# Other Variations

<v-divider></v-divider>

## Ramjets

Ramjets function like a turbojet, but do not include a turbine or compressor. Most of the original equations still apply, we just set $\tau_c= \tau_t=1$.

$$Isp_{air}=\ \frac{a_0M_0}{g}\left(\sqrt{\tau_b}-1\right)$$

$$TSFC=\frac{f}{a_0M_0}\left[\frac{1}{\sqrt{\tau_b}-1}\right]$$

Note that ramjet combustors tend to operate at a higher equivalence ratio. This means that some fuel remains un-combusted, and thus we need to revisit certain assumptions we made about turbojets. In particular, we must use $∆T_{equilibrium}$. This value will depend on initial temperature, and equivalence ratio. When considering a real ramjet, diffuser and nozzle are still largely adiabatic, but there is an associated drop in total pressure

## Afterburners

An afterburner is like attaching a ramjet to the back of a turbojet. Turbojet exhaust is combusted again, increasing thrust at the cost of efficiency.

$$\tau_b\tau_{ab}=\frac{T_9}{T_0}$$

$$Isp_{air}=\ \frac{a_0M_0}{g}\left(\sqrt{\frac{\tau_{ab}}{\tau_r-1}\left[\tau_\lambda\left(1-\frac{1}{\tau_r\tau_c}\right)-\tau_r(\tau_c-1)\right]}-1\right)$$

$$TSFC=\ \frac{1}{g{Isp}_{air}}\frac{c_pT_0}{\dot{Q_R}}\left[\tau_r\tau_c\left(\tau_b-1\right)+\tau_r\tau_c\tau_b\tau_t(\tau_{ab}-1)\right]$$

## Turbofans

A turbofan makes use of the turbine in a turbojet to generate shaft power which drives a ducted fan. It provides increased efficiency over a regular turbojet. Most commercial passenger planes fly with turbofan engines.
 
$$\alpha=\ \frac{air\ flow\ rate\ through\ bypass\ cycle}{air\ flow\ rate\ through\ turbojet\ cycle}$$

$$Thrust=\ \dot{m_0}u_9+\alpha\dot{m_0}u_{19}-(1+\alpha)\dot{m_0}u_0$$

Alpha is defined as the bypass ratio. Flow through the center should be treated like flow through the turbojet. Flow through the fan can be treated like flow through a compressor. Note that for the following equations we assume to interference in exhaust from the bypass and the turbojet.
Assume: Work absorbed by turbine = work done by compressor + work done by fan.

$$\dot{m_0}\left(h_{t3}-h_{t2}\right)+\ \alpha\dot{m_0}\left(h_{t13}-h_{t2}\right)=\ \eta_{mechanical}\dot{m_0}(1+f)\left(h_{t4}-h_{t5}\right)$$

$$\tau_t=1-\frac{\tau_r\left[\left(\tau_r-1\right)+\alpha(\tau_f-1)\right]}{\eta_{mechanical}(1+f)\tau_\lambda}$$

If ideal, since no combustion occurs, T19 = T0.

$$Isp_{air}=\ \frac{a_0M_0}{g}\left[\frac{1+f}{1+\alpha}\left(\frac{u_9}{u_0}\right)+\frac{\alpha}{1+\alpha}\left(\frac{u_{19}}{u_0}\right)-1\right]$$

$$\frac{u_{19}}{u_0}=\ \left(\frac{M_{19}}{M_0}\right)\sqrt{\frac{\gamma_{19}R_{19}T_{19}}{\gamma_0R_0T_0}}$$

As with a regular turbojet cycle, we can solve for the M19 and the ratio of temperatures by using the following setup. Notice that for an ideal scenario, the ratio of temperatures before and after the fan is 1, since no combustion occurs, thus you only need to find M19 using the relationships below.

$$\left(\frac{P_{t19}}{P_{19}}\right)^\frac{\gamma-1}{\gamma}=\frac{T_{t19}}{T_{19}}=1+\frac{\gamma-1}{2}{M_{19}}^2$$

$$(\frac{P_0}{P_{19}}\pi_r\pi_d\pi_{fan}\pi_n)^\frac{\gamma-1}{\gamma}=\frac{T_0}{T_{19}}(\tau_r \tau_{fan})$$

## Turboprops

Turboprops operate on a similar idea to turbofans, in that the turbine from the turbojet cycle drives a larger propeller out in front, which is ultimately responsible for generating most of the thrust. Unlike a turbofan, the blades do not spin in a duct. Notice that for this analysis we break the turbine into two parts, the first (4 to 4.5) drives the compressor, while the second (4.5 to 5) drives the propeller.
 
$$T_{prop}u_0=\ \dot{m_0}(1+f)\alpha\eta_{mechanical,\ LPT}\eta_{LPT}\eta_{gearbox}\eta_{propeller}(h_{t4.5}-h_{9s})$$

Where LPT stands for low pressure turbine (which drives propeller)

$$Power\ Split:\ \alpha=\ \frac{h_{t4.5}-h_{t5s}}{h_{t4.5}-h_{9s}}$$


## Inlets/Diffusers

Shock Ramp Inlets take advantage of oblique shocks to achieve near isentropic compression and minimize drag.

$$\frac{\dot{m}}{A}=MP_t\sqrt{\frac{\gamma}{RT_t}}\left[1+\frac{\gamma-1}{2}M^2\right]^\frac{-\gamma-1}{2(\gamma-1)}$$

$$c_{pr}=\frac{P_2-P_1}{q_1}$$

Starting Problem refers to the issue of how we can transition from subsonic to supersonic flow on a converging-diverging inlet. In general, it involves the questions of how to “swallow the shock”.

* Overspeed – By increasing M0 the bow shock moves closer towards the inlet.
* Kantrowitz Donaldson Inlet – fixed geometry CD inlet with an enlarged throat that places starting shock in the diverging section.
* Variable Geometry Inlet – For maximum efficiency, starting shock should occur in the throat. Thus, throat begins initially enlarged to swallow the shock, and then closes to push the shock upstream closer to the throat.

## Combustors

Law of mass action presents a way to calculate reaction rate. Equilibrium occurs when rate of products becoming reactants equals the rate of reactants becoming products.

$$r_{foward}=k_{forward}\left[A\right]^a\left[B\right]^b$$

$$K=\ \frac{k_{forward}}{k_{reverse}}=\frac{\left[C\right]^c\left[D\right]^d}{\left[A\right]^a\left[B\right]^b}$$

Note that equilibrium constant can also be represented with partial pressure, or mole fraction.
Laminar Flame Speeds tend to be on the order of 0.1-3 m/s, which is much slower than flight speeds. To prevent blowout, flame holders are sometimes required to slow down the flow. These also exert a drag on the flow, resulting in the following equation:

$$\frac{P_{t4}}{P_{t3}}=\frac{\left(1+\gamma{M_4}^2\left(1-\frac{C_d}{2}\right)\right)}{\left(1+\gamma{M_4}^2\right)}\left[\frac{1+\frac{\gamma-1}{2}{M_4}^2}{1+\frac{\gamma-1}{2}{M_3}^2}\right]^\frac{\gamma}{\gamma-1}$$

## Axial Compressors

Compressors consist of multiple stages. Each stage involves 1 rotor, followed by 1 stator. Rotor drives the fluid, giving it angular velocity, and increases total pressure. Stator converts extra angular velocity into an increase in static pressure but does no work on the fluid itself. Multi-staging is necessary to avoid boundary layer separation in rotor (which faces an adverse pressure gradient). We'll define the absolute fluid velocity as $C$.

Fluid Velocity Relative to Rotor

$$W=C-U$$
 
$$\tau=\ \dot{m}[r_2C_{\theta,2}-r_1C_{\theta,1}]$$

$$h_{t2}-h_{t1}=\ \omega[r_2C_{\theta,2}-r_1C_{\theta,1}]$$

Assume that C1 = C3 and Cz remains constant from stage 1 through stage 3. For small changes in stage pressure, and where stage efficiency is all the same, stage efficiency nstage is approximately equal to polytrophic compressor efficiency etc.

$$\beta_1=\alpha_2$$

$$\beta_2=\alpha_1$$

$$\frac{P_{t3}}{P_{t1}}=\left[1+\eta_{stage}\frac{U\Delta C_\theta}{c_pT_{t1}}\right]^\frac{\gamma}{\gamma-1}$$

$$\frac{T_{t2}}{T_{t1}}=1+\frac{U^2}{c_pT_{t1}}\left[1+\frac{C_z}{U}\left(\tan{\left(\beta_2\right)}-\tan(\alpha_1)\right)\right]$$

It is also useful to define unitless parameters to characterize axial compressor performance. Increasing the flow coefficient decreases total temperature rise and work contribution of the rotor.

Flow Coefficient

$$\phi=\ \frac{C_z}{U}$$

Stage Loading Factor

$$\psi= \frac{\Delta h_t}{U^2} = 1+\phi(\tan(\beta_2)-\tan(\alpha_1)$$

### Degree of Reaction for Compressor

Define as the ratio of static enthalpy rise over the rotor to total static enthalpy change in the stage. Usually we try to design this number to be equal to 50%.

$$R=\ \frac{h_2-h_1}{h_3-h_1}$$

## Axial Turbines

Calculations for an axial turbine is very similar to an axial compressor. In a turbine, a stator (or a nozzle) gives angular velocity to fluid flow, which drives the rotors. Since there is no adverse pressure gradient, fewer stages are needed.
 
$$R^o\ =1-\frac{C_{\theta2}-C_{\theta3}}{2U}$$

<v-card variant="tonal" class="mb-5">
  <v-card-title>
    Impulse Stage
  </v-card-title>
  <v-card-text>
    Entire static enthalpy drop happens over the stator/nozzle. Used when trying to minimize the number of stages (maximizing specific work per stage).
  </v-card-text>
</v-card>

<v-card variant="tonal" class="mb-5">
  <v-card-title>
    50% Degree of Reaction Stage 
  </v-card-title>
  <v-card-text>
    static enthalpy drop is split evenly between stator and rotor. Use to minimize losses and maximize isentropic efficiency. 
  </v-card-text>
</v-card>


### Component Matching

With the above equations, we can enforce the following constraints which allow us to solve the combined equations:

1. Turbine Angular Shaft Speed = Compressor Angular Shaft Speed
2. Constant mass flow rate of air
3. Work extracted by turbine = work done by compressor