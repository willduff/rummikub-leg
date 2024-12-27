const { cube, sphere, roundedCuboid } = require('@jscad/modeling').primitives
 
const rummikubLegSection = (params) => { // called from main() below
  var shapes = []
  shapes.push(
    roundedCuboid(params)
  )
  return shapes
}

const main = (params) => {
  let straightSection = rummikubLegSection({
    size: [params.straightWidth, params.straightDepth, params.straightHeight],
    center: [0, 0, 0],
    roundRadius: params.roundRadius,
    segments: params.segments
  })
  return straightSection
}

const getParameterDefinitions = () => {
    return [
        { name: 'straightWidth',  type: 'int',    initial: 50,   caption: 'Straight Section: Width in mm' },
        { name: 'straightDepth',  type: 'int',    initial: 6.5,  caption: 'Straight Section: Depth in mm' },
        { name: 'straightHeight', type: 'int',    initial: 2,    caption: 'Straight Section: Height in mm' },
        { name: 'roundRadius',    type: 'number', initial: 0.96, caption: 'Straight Section: Radius of extrusion in mm' },
        { name: 'segments',       type: 'int',    initial: 32,   caption: 'Straight Section: Number of segments used to round extrusion' },

        { name: 'angle', type: 'int', initial: 100, caption: 'Angled Section: Angle in ??' },
    ]
}

module.exports = { main, getParameterDefinitions }