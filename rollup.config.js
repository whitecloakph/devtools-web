import scss from 'rollup-plugin-scss'

export default {
    input: 'src/devtools.js',
    output: {
        file: 'public/devtools.js',
        format: 'iife',
        name: 'CbmbWebDevtoolsPopup'
    },
    plugins: [
        scss({
            output: 'public/devtools.css'
        })
    ]
}
