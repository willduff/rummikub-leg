const { cube, sphere, roundedCuboid } = require('@jscad/modeling').primitives
const { rotateX, rotateY, translate } = require('@jscad/modeling').transforms
const { degToRad } = require('@jscad/modeling').utils
const { union } = require('@jscad/modeling').booleans
 
const rummikubLegSection = (params) => {
  return union(
    roundedCuboid(params),
    rotateX(degToRad(90), roundedCuboid(params)),
  )
}

const rummikubAngledSection = (params) => {
  return translate(params.translatedCenter, 
    rotateY(degToRad(params.angle), rummikubLegSection(params))
  )
}

const main = (params) => {
  let straightSection = rummikubLegSection({
    size: [params.straightWidth, params.straightDepth, params.straightHeight],
    center: [0, 0, 0],
    roundRadius: params.roundRadius,
    segments: params.segments
  })
  let angledSection = rummikubAngledSection({
    size: [params.angledWidth, params.straightDepth, params.straightHeight],
    center: [0, 0, 0],
    roundRadius: params.roundRadius,
    segments: params.segments,
    angle: params.angle,
    translatedCenter: [(params.straightWidth / 2) - params.angledSectionOverlap + (params.angledWidth / 2) -  params.angledSectionOverlap, 0, params.angledHeightOffset]
  })
  return union(straightSection, angledSection)
}

const getParameterDefinitions = () => {
    return [
        { name: 'straightWidth',  type: 'number', initial: 58,   caption: 'Straight Section: Width in mm' },
        { name: 'straightDepth',  type: 'number', initial: 8,    caption: 'Straight Section: Depth in mm' },
        { name: 'straightHeight', type: 'number', initial: 2.5,  caption: 'Straight Section: Height in mm' },

        { name: 'roundRadius',    type: 'number', initial: 1.2,  caption: 'Straight Section: Radius of extrusion in mm' },
        { name: 'segments',       type: 'int',    initial: 16,   caption: 'Straight Section: Number of segments used to round extrusion' },

        { name: 'angle',                type: 'number', initial: 30, caption: 'Angled Section: Angle in degrees' },
        { name: 'angledWidth',          type: 'number', initial: 12, caption: 'Angled Section: Width in mm' },
        { name: 'angledHeightOffset',   type: 'number', initial: -2.25,  caption: 'Angled Section: Height offset of the angled section in mm' },
        { name: 'angledSectionOverlap', type: 'number', initial: 2,  caption: 'Angled Section: Overlap straight and angled section in mm' },
    ]
}

module.exports = { main, getParameterDefinitions }