# HowMuchIs13BillionEuros.com

[How much is 13 billion euros?](https://HowMuchIs13BillionEuros.com)

This is a [Framework](https://observablehq.com/framework/) website: I like it's reactivity and Markdown for building applications, and I plan to use this format for a new gallery.

The code relating to the editor here is a little messy: there are a few more feature implemented or in progress vs. what I use. Notably: reactive workings and formula/workings navigation (you can see some of this now in a few videos: [visualizing algorithms](https://www.youtube.com/watch?v=hKVXRACCnqU), [reverse code golfing](https://www.youtube.com/watch?v=uXUd_-xrycs))

The main narrative and application code, [./src/index.md](./src/index.md), includes some patterns which will need more attention for reusability - please let me know about any suggestions!

The calculang code is in [./src/cul/how-much.cul.js](./src/cul/how-much.cul.js). It doesn't use modularity or anything "fancy".

It's reasonable to fork this repo for similar-minded narrative type models or other. Please tag or heads-up me if you do!

A greater variety of examples will be included when I base a new calculang gallery on this format.

Please [get in touch](https://calcwithdec.dev/about) or create an issue if you have suggestions.

## License

Licensed under the [AGPLv3](./LICENSE)
