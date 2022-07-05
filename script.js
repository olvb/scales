"use strict";

const NB_STRINGS = 6

class Shape {
    constructor(name, position, ascii) {
        console.assert(position >= 1 && position <= 5);
        this.name = name;
        this.position = position;
        this.array = Shape.asciiToArray(ascii)
        this.className = `${name}_${position}`
    }

    static asciiToArray(ascii) {
        let nbFrets = ((ascii.length - 1) / NB_STRINGS - 2) / 4;
        let cursor = 1;
        let array = new Array(NB_STRINGS).fill(null);
        for (let stringIndex = 0; stringIndex < NB_STRINGS; stringIndex++) {
            let subArray = new Array(nbFrets).fill(null);
            for (let fretIndex = 0; fretIndex < nbFrets; fretIndex++) {
                let value = ascii[cursor + 2];
                if (value != "-") {
                    subArray[fretIndex] = value;
                }
                cursor += 4;
            }
            cursor += 2;
            array[stringIndex] = subArray;
        }
        return array;
    }
}

const ALLOWED_VALUES = ["x", "M"]

const _TEMPLATE = `
|---|---|---|---|---|---|
|---|---|---|---|---|---|
|---|---|---|---|---|---|
|---|---|---|---|---|---|
|---|---|---|---|---|---|
|---|---|---|---|---|---|
`

// PENTATONIC
const PENTA = "penta";
const PENTA_1 = new Shape(PENTA, 1, `
|---|---|-M-|---|-x-|---|
|---|---|-x-|---|-x-|---|
|---|-x-|---|-x-|---|---|
|---|-x-|---|---|-M-|---|
|---|-x-|---|---|-x-|---|
|---|---|-M-|---|-x-|---|
`)
const PENTA_2 = new Shape(PENTA, 2, `
|---|---|-x-|---|-x-|---|
|---|---|-x-|---|---|-M-|
|---|-x-|---|---|-x-|---|
|---|---|-M-|---|-x-|---|
|---|---|-x-|---|-x-|---|
|---|---|-x-|---|-x-|---|
`)
const PENTA_3 = new Shape(PENTA, 3, `
|---|-x-|---|---|-x-|---|
|---|---|-M-|---|-x-|---|
|---|-x-|---|-x-|---|---|
|---|-x-|---|-x-|---|---|
|---|-x-|---|---|-M-|---|
|---|-x-|---|---|-x-|---|
`)
const PENTA_4 = new Shape(PENTA, 4, `
|---|---|-x-|---|-x-|---|
|---|---|-x-|---|-x-|---|
|---|-x-|---|---|-M-|---|
|---|-x-|---|---|-x-|---|
|---|---|-M-|---|-x-|---|
|---|---|-x-|---|-x-|---|
`)
const PENTA_5 = new Shape(PENTA, 5, `
|---|-x-|---|---|-M-|---|
|---|-x-|---|---|-x-|---|
|---|-M-|---|-x-|---|---|
|---|-x-|---|-x-|---|---|
|---|-x-|---|-x-|---|---|
|---|-x-|---|---|-M-|---|
`)
const SHAPES_PENTA = [PENTA_1, PENTA_2, PENTA_3, PENTA_4, PENTA_5];

// MAJOR
const MAJOR = "major"
const MAJOR_1 = new Shape(MAJOR, 1, `
|---|-x-|-M-|---|-x-|---|
|---|---|-x-|---|-x-|---|
|---|-x-|---|-x-|-x-|---|
|---|-x-|---|-x-|-M-|---|
|---|-x-|-x-|---|-x-|---|
|---|-x-|-M-|---|-x-|---|
`)
const MAJOR_2 = new Shape(MAJOR, 2, `
|---|-x-|---|-x-|-x-|---|
|---|-x-|---|-x-|-M-|---|
|-x-|-x-|---|-x-|---|---|
|-x-|-M-|---|-x-|---|---|
|---|-x-|---|-x-|---|---|
|---|-x-|---|-x-|-x-|---|
`)
const MAJOR_3 = new Shape(MAJOR, 3, `
|---|-x-|-x-|---|-x-|---|
|---|-x-|-M-|---|-x-|---|
|---|-x-|---|-x-|---|---|
|---|-x-|---|-x-|-x-|---|
|---|-x-|---|-x-|-M-|---|
|---|-x-|-x-|---|-x-|---|
`)
const MAJOR_4 = new Shape(MAJOR, 4, `
|---|-x-|---|-x-|---|---|
|---|-x-|---|-x-|-x-|---|
|-x-|---|-x-|-M-|---|---|
|-x-|-x-|---|-x-|---|---|
|-x-|-M-|---|-x-|---|---|
|---|-x-|---|-x-|---|---|
`)
const MAJOR_5 = new Shape(MAJOR, 5, `
|---|-x-|---|-x-|-M-|---|
|---|-x-|-x-|---|-x-|---|
|-x-|-M-|---|-x-|---|---|
|---|-x-|---|-x-|---|---|
|---|-x-|---|-x-|-x-|---|
|---|-x-|---|-x-|-M-|---|
`)
const SHAPES_MAJOR = [MAJOR_1, MAJOR_2, MAJOR_3, MAJOR_4, MAJOR_5];

class App {
    constructor(shapes, nbFrets = 6) {
        this.shapes = shapes.slice();
        this.nbFrets = nbFrets;
        this.build();
        this.run();
    }

    build() {
        this.buildFretBoard();
        this.buildChangeButton();
        for (let shape of this.shapes) {
            console.log(shape)
            this.buildShape(shape);
        }
    }

    buildFretBoard() {
        this.board = document.getElementById("board");
        for (let stringIndex = 0; stringIndex < NB_STRINGS; stringIndex++) {
            for (let fretIndex = 0; fretIndex < this.nbFrets; fretIndex++) {
                this.buildCell(stringIndex, fretIndex);
            }
        }
    }

    buildCell(stringIndex, fretIndex) {
        let cell = document.createElement("div");
        cell.id = `cell_${stringIndex}_${fretIndex}`;
        cell.style["grid-row"] = stringIndex + 1;
        cell.style["grid-column"] = fretIndex + 1;

        cell.className = "cell";
        if (stringIndex == 0) {
            cell.classList.add("first-string");
        } else if (stringIndex == NB_STRINGS - 1) {
            cell.classList.add("last-string");
        }
        if (fretIndex == 0) {
            cell.classList.add("first-fret");
        } else if (fretIndex == this.nbFrets - 1) {
            cell.classList.add("last-fret");
        }

        let subCellTop = document.createElement("div");
        subCellTop.className = "sub-cell-top";
        cell.appendChild(subCellTop);

        let subCellBottom = document.createElement("div");
        subCellBottom.className = "sub-cell-bottom";
        cell.appendChild(subCellBottom);

        this.board.appendChild(cell);
    }

    buildShape(shape) {
        let array = shape.array
        const COLOR_BY_VALUE = { "x": "black", "M": "black" }
        for (let stringIndex = 0; stringIndex < NB_STRINGS; stringIndex++) {
            for (let fretIndex = 0; fretIndex < array[stringIndex].length; fretIndex++) {
                let value = array[stringIndex][fretIndex];
                if (value === null) {
                    continue;
                }
                console.assert(ALLOWED_VALUES.includes(value));
                let finger = document.createElement("div");
                finger.className = "finger";
                finger.classList.add(shape.className);
                finger.style["background-color"] = COLOR_BY_VALUE[value];
                let cell_id = `cell_${stringIndex}_${fretIndex}`;
                let cell = document.getElementById(cell_id);
                cell.appendChild(finger);
            }
        }
    }

    changeShape() {
        let shapeIndexToShow = 1 + Math.floor(Math.random() * (this.shapes.length - 1));
        let shapeToShow = this.shapes[shapeIndexToShow];
        this.shapes.splice(shapeIndexToShow, 1);
        this.shapes.unshift(shapeToShow);

        for (let shape of this.shapes) {
            let shapeClass = shape.className;
            let state = (shapeClass == shapeToShow.className) ? "block" : "none";
            var fingers = document.getElementsByClassName(shapeClass)
            for (let finger of fingers) {
                finger.style["display"] = state;
            }
        }

        // let name = document.getElementById("name");
        // name.innerText = shape.name;
    }

    buildChangeButton() {
        let change = document.getElementById("change");
        change.onclick = this.changeShape.bind(this);
    }

    run() {
        this.changeShape();
    }
}

let app = new App(SHAPES_MAJOR);
