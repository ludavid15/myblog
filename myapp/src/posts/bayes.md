---
title: "Bayes Theorem"
topic: "Math"
path: "bayes"
author: "David Lu"
date: "2023-04-15"
---

Although there are many interpretations of Bayes Theorem, let's start with this one: Bayes Theory gives us a way to update a prediction based on observation of new evidence. 


# Basic Mathematical Statement

<v-divider></v-divider>

The probability of A given B, is equal to the probability of B given A, times the probability of A, divided by the probability of B. 

$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$


<v-card variant="tonal">
    <v-card-title>The Prior Probability</v-card-title>
    <v-card-text>
    I think of this like the original estimate. This is what we are going to be updating, when we take into account new information about how B relates to A. 
    </v-card-text>
</v-card>

$$ P(A) $$


<v-card variant="tonal">
    <v-card-title>The Posterior Probability</v-card-title>
    <v-card-text>
    This is what we are solving for. In the absence of observed data, we would be solving for P(A). But if we have some observation B, now we can solve for a conditional probability, i.e. the probability of A given B.
    </v-card-text>
</v-card>

$$ P(A\|B) $$

<v-card variant="tonal">
    <v-card-title>The Likelihood</v-card-title>
    <v-card-text>
    This term is called the likelihood because it is equal to the likelihood of A given a fixed B. 
    </v-card-text>
</v-card>

$$ P(B\|A) $$