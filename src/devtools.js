import './devtools.scss'

function createDummyCollection() {
    let collections = []

    for (let i = 1; i <= 15; i++) {
        let newCollection = {
            name: `Collection ${i}`,
            endpoints: [],
        }

        let endpointsCount = Math.floor(Math.random() * 4) + 1

        for (let j = 1; j <= endpointsCount; j++) {
            let newEndpoint = {
                name: `Endpoint ${j}`,
                options: [
                    {
                        name: '200'
                    },
                    {
                        name: '202 (otp)'
                    },
                    {
                        name: '400'
                    },
                    {
                        name: '404'
                    },
                ]
            }

            newCollection.endpoints.push(newEndpoint)
        }

        collections.push(newCollection)
    }

    return collections
}

function createOptionHtml(option) {
    let root = window.document.createElement('option')
    root.innerText = option.name

    return root
}

function createOptionsHtml(options) {
    let root = window.document.createElement('select')
    root.classList.add('form-control')

    options
        .map((option) => createOptionHtml(option))
        .forEach((optionHtml) => {
            root.appendChild(optionHtml)
        })

    return root
}

function createEndpointHtml(endpoint) {
    let root = window.document.createElement('li')

    let name = window.document.createElement('div')
    name.classList.add('w-50')
    name.innerText = endpoint.name

    let options = window.document.createElement('div')
    options.classList.add('w-50')
    options.appendChild(createOptionsHtml(endpoint.options))

    root.classList.add('list-group-item', 'd-flex', 'align-items-center')
    root.appendChild(name)
    root.appendChild(options)

    return root
}

function createCollectionHtml(collection) {
    let root = window.document.createElement('section')

    let header = window.document.createElement('div')

    let title = window.document.createElement('h1')
    title.classList.add('card-title', 'mb-0', 'flex-grow-1')
    title.innerText = collection.name

    let toggleWrapper = window.document.createElement('label')

    let toggle = window.document.createElement('input')
    toggle.setAttribute('type', 'checkbox')
    toggle.checked = true

    let toggleLabel = window.document.createElement('span')
    toggleLabel.classList.add('sr-only')
    toggleLabel.innerText = 'Activated'

    toggleWrapper.classList.add('d-block', 'mb-0')
    toggleWrapper.appendChild(toggle)
    toggleWrapper.appendChild(toggleLabel)

    header.classList.add('card-header', 'd-flex', 'justify-content-between')
    header.appendChild(title)
    header.appendChild(toggleWrapper)

    let endpointWrapper = window.document.createElement('ul')
    endpointWrapper.classList.add('list-group', 'list-group-flush')
    collection.endpoints
        .map((endpoint) => createEndpointHtml(endpoint))
        .forEach((endpointHtml) => {
            endpointWrapper.appendChild(endpointHtml)
        })

    root.classList.add('card')
    root.appendChild(header)
    root.appendChild(endpointWrapper)
    return root
}

function createCollectionsHtml(collections) {
    let root = window.document.createElement('div')
    root.classList.add('card-columns')

    collections
        .map((collection) => createCollectionHtml(collection))
        .forEach((collectionHtml) => {
            root.appendChild(collectionHtml)
        })

    return root
}

function onShown(e) {
    let collections = createDummyCollection()
    let collectionsHtml = createCollectionsHtml(collections)

    window.document.getElementById('collections-root')
        .appendChild(collectionsHtml)
}

window.addEventListener('load', onShown)

if (chrome.devtools) {
    chrome.devtools.panels.create(
        "DevTools",
        "icon.png",
        "devtools.html",
        (panel) => {
        }
    )
}
