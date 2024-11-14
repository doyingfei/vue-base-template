import {presetUno, presetIcons} from 'unocss'
import {defineConfig} from 'unocss'
import {FileSystemIconLoader} from '@iconify/utils/lib/loader/node-loaders'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
    presets: [
        presetUno(),
        presetIcons({
            collections: {
                my: FileSystemIconLoader('./src/assets/icons', svg => svg.replace(/(<svg.*?width=)"(.*?)"/, '$1"1em"').replace(/(<svg.*?height=)"(.*?)"/, '$1"1em"').replace(/#fff/, 'currentColor')),
            }
        }),
        presetRemToPx({
            baseFontSize: 4
        })
    ],
    rules: [
        [
            /^b(t|r|b|l|d)-(.*)/,
            ([, d, c]) => {
                const DIRECTION_MAPPINGS = {t: 'top', r: 'right', b: 'bottom', l: 'left'}
                const direction = DIRECTION_MAPPINGS[d] || ''
                const p = direction ? `border-${direction}` : 'border'
                const attrs = c.split('_')
                if (
                    // 属性中不包含 border-style 则默认 solid
                    !attrs.some((item) =>
                        /^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/.test(item),
                    )
                ) {
                    attrs.push('solid')
                }
                // 属性中不包含 border-width 则默认 1px
                if (!attrs.some((item) => /^\d/.test(item))) {
                    attrs.push('1px')
                }
                return {
                    [p]: attrs.join(' '),
                }
            },
        ]
    ]
})