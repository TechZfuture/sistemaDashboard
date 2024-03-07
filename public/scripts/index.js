function blurInput(input){
    const idLabel = 'label_' + input.name;

    const isValue = input.value !== ''
    const label = document.getElementById(idLabel)
    label.classList = isValue ? 'active' : ''
}