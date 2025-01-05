---
title: "Introduction to Structural Analysis"
topic: "Structures"
path: "intro-to-structures"
author: "David Lu"
date: "2021-06-21"
---

In dynamics, we often make a "rigid body" assumption for all our working parts. All forces merely cause these objects to move or rotate. In reality, forces can cause pieces to deform or even break. Structural mechanics then, is the study of these deformations and failures.


# Moments

<v-divider></v-divider>

I remember during school that "moments" was a term that kept reappearing. And depending on the application, this can mean different things. So here's a quick summary:


<v-card variant="tonal" class="mb-5">
    <v-card-text>1st Moment: Centroid and Center of Mass. The integral of distance with respect to area.</v-card-text>
</v-card>

$$\iint x d A$$	

<v-card variant="tonal" class="mb-5">
    <v-card-text>
    2nd Moment: Second Moment of Inertia/Area or Area Moment of Inertia [m^4], This property is relevant for 2D objects! Beam bending uses this type of moment calculation.
    </v-card-text>
</v-card>


$$I_y=\iint{x^2dA}$$

$$I_x=\iint{y^2dA}$$

$$I_{xy}=\iint x y dA$$	

$$I=\ mr^2$$	

<v-card variant="tonal" class="mb-5">
    <v-card-text>
    Moment of Inertia: 3D objects have can have moments in Yaw, Pitch and Roll. Units of [kg-m^2]
    </v-card-text>
</v-card>

$$M = Iα$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>
    Moment or Torque: Moment of Force/Torque [Nm] - Causes angular acceleration/torsion
    </v-card-text>
</v-card>

$$T=\ f\ast d$$


 
# Stress & Strain in 1D

<v-divider></v-divider>

Where E is young’s modulus. E for Al 6061 is 68.9 GPa. We can also define Poisson’s ratio (v) as the ratio of transverse strain to axial strain. (v) for aluminum and steel is about 0.33, and about 0.5 for rubber.

$$\sigma=\ \frac{F}{A}$$

$$\varepsilon =\ \frac{\Delta L}{L}$$ 

$$\varepsilon =\ \frac{\sigma}{E}$$

### Shear
Shear strains ($\gamma$) can be induced by shear stresses ($\tau$). In the simplest case, they are related by the following equation, where G is the shear modulus, a material property. Shear strains change the shape/angle of the object and is generally defined as the change in angle.

$$\gamma=\frac{1}{G}\tau$$
 
## Expanded Stress & Strain Matrix for 3D Elements

Normal and shear stresses are identified by two subscripts. The first denotes the plane in which the stress acts, and the second denotes the direction. For example, $\sigma_{xy}$ refers to shear stress acting in the x-plane (i.e. normal to the x direction) and in the y-direction. By force balance, we can also show that $\sigma_{xy}=\sigma_{yx}$.
 
The fully expanded relationship between stress and the strain can be represented by the following matrix. For isotropic and/or orthotropic materials this simplifies significantly. Below, v is Poisson’s ratio, E is Young’s modulus, and G is the shear modulus. The other moduli (n and µ) are not relevant for most materials. When in the following format, the large matrix is known as the *compliance matrix*. Its inverse is known as the stiffness matrix.

$$\left[\begin{matrix}\varepsilon_{xx}\\\varepsilon_{yy}\\\varepsilon_{zz}\\\gamma_{yz}\\\gamma_{xz}\\\gamma_{xy}\\\end{matrix}\right]=\left[\begin{matrix}\frac{1}{E_x}&-\frac{v_{yx}}{E_y}&-\frac{v_{zx}}{E_z}&\frac{n_{yz,x}}{G_{yz}}&\frac{n_{xz,x}}{G_{xz}}&\frac{n_{xy,x}}{G_{xy}}\\-\frac{v_{xy}}{E_x}&\frac{1}{E_y}&-\frac{v_{zy}}{E_z}&\frac{n_{yz,y}}{G_{yz}}&\frac{n_{xz,y}}{G_{xz}}&\frac{n_{xy,y}}{G_{xy}}\\-\frac{v_{xz}}{E_x}&-\frac{v_{yz}}{E_y}&\frac{1}{E_z}&\frac{n_{yz,z}}{G_{yz}}&\frac{n_{xz,z}}{G_{xz}}&\frac{n_{xy,z}}{G_{xy}}\\\frac{n_{x,yz}}{E_x}&\frac{n_{y,yz}}{E_y}&\frac{n_{z,yz}}{E_z}&\frac{1}{G_{yz}}&\frac{\mu_{xz,yz}}{G_{xz}}&\frac{\mu_{xy,yz}}{G_{xy}}\\\frac{n_{x,xz}}{E_x}&\frac{n_{y,xz}}{E_y}&\frac{n_{z,xz}}{E_z}&\frac{\mu_{yz,xz}}{G_{yz}}&\frac{1}{G_{xz}}&\frac{\mu_{xy,xz}}{G_{xy}}\\\frac{n_{x,xy}}{E_x}&\frac{n_{y,xy}}{E_y}&\frac{n_{z,xy}}{E_z}&\frac{\mu_{yz,xy}}{G_{yz}}&\frac{\mu_{xz,xy}}{G_{xz}}&\frac{1}{G_{xy}}\\\end{matrix}\right]\ast\left[\begin{matrix}\sigma_{xx}\\\sigma_{yy}\\\sigma_{zz}\\\tau_{yz}\\\tau_{xz}\\\tau_{xy}\\\end{matrix}\right]$$

## Isotropic Materials in 3D 

An isotropic material has the same properties in all three directions. Hence, the only non-zero values occur on the diagonal. 

$$\left[\begin{matrix}\frac{vE}{\left(1+v\right)\left(1-2v\right)}+2G&&\\&\frac{vE}{\left(1+v\right)\left(1-2v\right)}+2G&\\&&\frac{vE}{\left(1+v\right)\left(1-2v\right)}+2G\\\end{matrix}\right]$$

### Orthotropic Materials
An orthotropic material (Properties vary in 3 directions) has three elastic moduli, three shear moduli, and three Poisson’s ratios.

### Axial Stress in Beams
For a symmetric beam, the axial stress is a function of the distance away from the centroid. Mathematically, that is:

$$\sigma_{yy}=\frac{zM_Z}{I_Z}$$

When the beam is non-symmetric (for example, a section of webs and stringers), moments in the X and Z directions have a coupled effect on the axial stress. The resultant stress is then a function of the location (x, z) relative to the centroid, the applied moments, and the area moment of inertia. 

$$\sigma_{yy}=\left(x-x_c\right)\frac{I_XM_Z+I_{XZ}M_X}{I_XI_Z-I_{XZ}^2}+\left(z-z_c\right)\frac{I_Z M_X+I_{XZ}M_Z}{I_X I_Z-I_{XZ}^2}$$
 
# Shear in Beams

<v-divider></v-divider>

For the beam pictured below, a force applied in the x-direction causes axial compression in the top of the I-beam ($\sigma_{xx}$) and tension in the bottom. By force balance, this also causes a shear force, $\sigma_{xy}$ in the cross section of the beam. It is important to remember that changes in the axial stress cause changes in the shear stress.

This shear stress at a location y along the cross section of the beam can be calculated with the equation below. Where c is the y location of the centroid of the beam. Note that we assume the applied shear force does not twist the section. This is true only if the force is applied through the shear center. 
 
$$\sigma_{xy}=\frac{V_y}{I_zt}\int_{y1}^{c}ydA$$

The above equation is useful for beams with thick walled sectioned. When the beam consists instead of stringers and thin webbed members, we can simplify the problem and avoid using integrals.

*Solving problems with shear flows allow us to do away with stresses for a while and work directly with the forces, which makes our life a bit easier*


## Shear Flow

Consider now if the cross section of the beam consists of stringers and thin webbed members. The stringers are going to carry all the axial stresses, while the webs take care of shear stresses. Since the webs are thin, the shear stress will be constant along these webs. This leads to an idea called “shear flow”. Note that this concept is not defined for thick walled sections. We define shear flow in terms of the shear stress in a web, and the thickness. It is in units of force per length. At each stringer, there is a change in shear flow equal to the bending moment carried by that stringer. 

$$q=\tau_{xy}\ast thickness$$

$$F_y=\int_{0}^{y}qdy$$

$$F_x=\int_{0}^{x}qdx$$

Integrating the shear flow (Force/Length) along the web yields the total shear force. 

## Shear Center
The shear center is defined as the point where if a shear force is applied, no additional torsion is created. For symmetric sections, the shear center coincides with the centroid. For non-symmetric & open sections, the shear center can be found as follows:

1. Find the shear flows in each beam. Since the section is open, you have the boundary conditions needed to find them directly.
2. Select an arbitrary point in your section, and the find the torque around that point due to the shear flows. A is the area swept out by the web.

$$T=2Aq$$

3. The shear center is the point where if the shear force is applied, it will cancel out the torque due to the shear flow around the point you’ve selected.

## Process to Solving Simple 1 Box Problem

When the section is closed, you do not have the boundary conditions necessary to immediately solve for the shear flows. Instead you’ll impose a torque balance condition at the end and then solve a system of equations. 

1. Find the moment of inertia of the cross section.
2. Assume that the shear force is applied at the shear center. Find the bending moment (force/length) carried by each stringer with the following equation.

$$∆P= V_yI_zA$$

3. At each stringer, the change in shear flow (force/length) is equal to the bending moment carried by that stringer. Use this to relate all the shear flow variables.
4. Since we’ve assumed the shear force is initially applied at the shear center, we can find the location of the shear center by imposing that the torque due to the shear flows must be equal to the restoring torque caused by the shear force at the shear center.

$$T=\sum2Aq=V_x\ast e$$

5. Now find the additional shear flow caused by the shear force being applied away from the shear center. Assuming all walls are of the same thickness, the shear flow will be constant in every wall in this pure torsion case.
6. Add the two resultant shear flows together to get the total.


 
## Shear Flow in Multiple Cells

When multiple cells are adjacent to one another, you must apply a compatibility constraint, which states that the twist in both cells are equal.

$$\theta_1=\frac{q_1}{A_1}∆S_i t_i$$

Where $q_1$ is the shear flow due to pure torsion in the cell, $A_1$ is the area of the cell, $S_i$ is the length of the wall, and $t_i$ is the thickness of the wall. When you have two cells that are adjacent, you must account for the shear flow in the shared wall due to the other cell. Setting the two twist equations equal and then writing the torque equation below provides you with two equations to solve for the two unknowns.

$$\theta_2=\theta_1=\frac{q_1}{A_1}∆S_it_i-q2A_1∆S_{shared}t_{shared}$$

$$T=2 A_1 q_1+2 A_2 q_2$$
 


# Principle Stress

<v-divider></v-divider>

The magnitude of axial stress and shear stress will change depending on the coordinate frame used, though the total "energy" remains constant. Thus in some frame, the shear stress will go to zero, and the axial stress will be maximized. These maximum axial stresses are also known as principle stresses. 

Mathematically, the principle stresses are the eigenvalues of the stress tensor, and the direction in which they act are the principle directions (the eigenvectors).

$$\left[\begin{matrix}\sigma_{xx}&\tau_{xy}&\tau_{xy}\\\tau_{xy}&\sigma_{yy}&\tau_{yz}\\\tau_{xz}&\tau_{yz}&\sigma_{zz}\\\end{matrix}\right]=0$$


# Pressure Vessels

<v-divider></v-divider>

For a cylindrical pressure vessel of radius $$r$$ and a (thin) wall of thickness $$t$$, we can define the hoop stress and axial stress using the equations below:

$$\sigma_{Hoop}=\frac{Pr}{t}$$

$$\sigma_{Axial}=\frac{Pr}{2t}$$