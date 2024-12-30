---
title: "Reliability"
topic: "Engineering"
path: "reliability"
author: "David Lu"
date: "2024-12-10"
---

Reliability engineering aims to understand the probability of success over time. It is heavily based in probability and statistics. 

First, let's define a few terms. A **fault** is when something doesn't perform as expected, regardless of the cause. A **failure** is when something is broken, which usually results in a fault. A **failure mode** is the way in which a fault occurs. 


# Failure Rate

<v-divider></v-divider>

Let's say you perform some testing on 10 units for 100 hours each. By the end of that testing, 4 units failed, at [35, 47, 32, 41] hours. What would be the failure rate? Well, you'd divide the number of failures (in this case 4) by the total number of cycles that were run across all 10 units. This means the sum of 35 + 47 + 32 + 41, but also 6(100), which is the time that the other six units ran successfully without any failure. 

$$Failure Rate (\lambda) = \frac{Number of Failures}{Operating Time} = Failures Per Hour$$


## Inverse of the Failure Rate

Although the failure rate is easy to calculate from data, it's not as useful for day to day planning. Instead, we often take the inverse of the failure rate, which gives us a much more intuitive value. The **mean time to failure** (MTTF) is the reliability index we use for non-repairable units. This goes for things like lightbulbs, where the part does not have anymore function after failing. In contrast, for repairable units (like your car), we use something called the **mean time between failure** (MTBF). 

$$MTTF (\theta) = \frac{Operating Time}{Number of Failures}$$

$$MTBF (\theta) = \frac{Operating Time}{Nuber of Failures}$$

$$\lambda = \frac{1}{\theta}$$


# Mean Time to Recovery

Besides just how often a part may fail, we're also interested in how long is takes to fix these failures. This leads us to the mean time to recovery. This is the average time it takes to restore normal operations after a failure has occured. 


# Availability

<v-divider></v-divider>

Now that we've discussed the mean time between failure and the mean time to recover, we can combine these values into a new metric known as *availability*. You can think of this like a measure of the "down time". Officially, availability is defined as the percentage of time which a system is ready/operational under normal circumstances. The availability is calculated as a fraction:

$$A(t) = \frac{MTBF}{MTBF + MTTR}$$

The above value is unitless, but you could multiply this value by 8760 for example (the number of hours in a year) to get an estimate for down time in a year. 


# Reliability

<v-divider></v-divider>

If we know the failure rate, how can we answer the question: What is my probability of success after (t) amount of time? We should expect that as time increases, this probability should go down. 

$$R = exp^{(- \lambda t)}$$


### More Advanced Calculations

Now that we have some basic definitions, let's see how we can calculate results to more complex questions. Did I mention that reliability deals heavily in probabilities and statistics?  

To begin, how do we handle multiple parts in series or parallel? If they are in series, we multiply their reliabilities together:

$$R_s = R_a * R_b$$

If they are in parallel, we add them and then subtract the product:

$$R_p = R_a + R_b - R_a*R_b$$

Taking these two, we can combine more complex systems to calculate a net reliability. We can also calculate coupled probabilities using [Bayes Theorem](/notes/bayes).

# Failure Modes and Effects Analysis

<v-divider></v-divider>

Also known FMEA, or sometimes FMECA, this type of analysis aims to understand the ways in which parts fail, and any effects that failure would cause. It helps inform us where the highest risks are, and allows us to plan our risk mitigation strategy. High risk items can be those which fail often, or those that that have very severe consequences, or both!

The types of failure modes will depend on the level of detail we're exploring. At the lowest level, (e.g. an electrical interface) you can define failure modes based on fundamental failure mechanisms, such as an open circuit or short circuit. 

For components like a resistor, which perform a pretty basic function, it's easy to capture 100% of the ways in which it can fail. But as you get more complex, (e.g. a whole circuit board), you have to start thinking about what the larger system performs. Maybe this circuit board's function is to perform convolutional encoding of your data. At this level the failure modes might be more abstract, but in theory can still be accounted for through logical induction and looking at all the individual components. 

> A FMECA is like an FMEA but with the addition of a "criticality" component. This usually means assigning a numerical liklihood to a failure. In my experience, this can be a significant increase to the workload, with not so clear a return on value. It can be fine to leave this out on most programs. 


## Redundancy

Putting in redundancy provides an easy way to improve reliability. Consider an example of a satellite. We can put in two separate controllers, and keep one turned off as a backup in case anything goes wrong with the first one. This is known as a cold standby. If this backup unit is never used, it comes with the added benefit of potentially doubling the usable life of our satellite. 

But we could also keep the backup on. In this case, this is called a warm standby. This might allow for a quicker swap in the event of failure. Unfortunately, in this case we'd be burning through the usable life of both units. So if each unit is designed for 5 years of operation, at the end of five years both would be at the end of their life. 








