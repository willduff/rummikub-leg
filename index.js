const { cube, sphere, roundedCuboid } = require('@jscad/modeling').primitives
const { rotateX } = require('@jscad/modeling').transforms
const { degToRad } = require('@jscad/modeling').utils
 
const rummikubLegSection = (params) => {
  return [
    roundedCuboid(params),
    rotateX(degToRad(90), roundedCuboid(params)),
  ]
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
        { name: 'straightWidth',  type: 'number', initial: 10,   caption: 'Straight Section: Width in mm' },
        { name: 'straightDepth',  type: 'number', initial: 7.5,  caption: 'Straight Section: Depth in mm' },
        { name: 'straightHeight', type: 'number', initial: 2.5,    caption: 'Straight Section: Height in mm' },
        { name: 'roundRadius',    type: 'number', initial: 1.2, caption: 'Straight Section: Radius of extrusion in mm' },
        { name: 'segments',       type: 'int',    initial: 16,   caption: 'Straight Section: Number of segments used to round extrusion' },

        { name: 'angle', type: 'int', initial: 100, caption: 'Angled Section: Angle in ??' },
    ]
}

module.exports = { main, getParameterDefinitions }