(function () {
    let rows = prompt("Please enter number of rows?");
    let cols = prompt("Please enter number of columns?");

    let container = document.getElementById("container");

    let positionX = 12.5;
    let positionY = 12.5;
    let count = 0;
    let pointCordinates = [[0, 0]];
    let allDots;

    let character = document.getElementById("character");

    let keyPress = document.addEventListener("keydown", (e) => {
        let c = [];
        if (e.keyCode === 38) {                  //Up

            if (positionY > 50) {
                positionY = positionY - 50
                if (positionY < cols * 50) {
                    character.style.top = `${positionY}px`;
                    character.style.transform = "rotate(270deg)";
                    count++;
                    if (positionY < 13) {
                        character.style.transform = "rotate(90deg)";
                    }
                }
            }

        } else if (e.keyCode === 40) {            //Down

            if (positionY < (cols - 1) * 50) {
                positionY = positionY + 50
                if (positionY < cols * 50) {
                    character.style.top = `${positionY}px`;
                    character.style.transform = "rotate(90deg)";
                    count++;
                    if (positionY > (cols - 1) * 50) {
                        character.style.transform = "rotate(270deg)";
                    }
                }
            }
        } else if (e.keyCode === 39) {              //Right
            if (positionX < (rows - 1) * 50) {
                positionX = positionX + 50
                if (positionX < rows * 50) {
                    character.style.left = `${positionX}px`;
                    character.style.transform = "rotate(360deg)";
                    count++;
                    if (positionX > (rows - 1) * 50) {
                        character.style.transform = "rotate(180deg)";
                    }
                }
            }
        } else if (e.keyCode === 37) {               //left

            if (positionX > 50) {
                positionX = positionX - 50
                if (positionX < rows * 50) {
                    character.style.left = `${positionX}px`;
                    character.style.transform = "rotate(180deg)";
                    count++;
                    if (positionX < 13) {
                        character.style.transform = "rotate(360deg)";
                    }
                }
            }
        }

        c.push((positionY - 12.5) / 50);
        c.push((positionX - 12.5) / 50);

        for (let i = 0; i < pointCordinates.length; i++) {
            if (JSON.stringify(pointCordinates[i]) === JSON.stringify(c)) {
                pointCordinates.splice(i, 1);
                for (let j = 0; j < allDots.length; j++) {
                    allDots[j].parentNode.removeChild(allDots[j])
                }
                createPoint();
                if (pointCordinates.length === 0) {
                    alert(`Total distance travelled = ${count}`);
                }
            }
        }
    }, false);

    createGrid(rows, cols);
    function createGrid(rows, cols) {
        for (let i = 0; i < rows; i++) {                               //rows
            for (let j = 0; j < cols; j++) {                           //columns
                var cell = document.createElement("div");
                container.appendChild(cell);
            };
        };
        container.style.width = `${50 * rows}px`;
    };

    let arrayOfPoints = generateCoordinates(rows, cols);

    function createPoint() {

        for (let i = 0; i < arrayOfPoints.length; i++) {
            let dots = document.createElement("div");
            dots.className = "points";

            let a = arrayOfPoints[i][0];
            let b = arrayOfPoints[i][1];

            dots.style.top = a * 50 + 15 + "px";
            dots.style.left = b * 50 + 15 + "px";
            container.appendChild(dots);
        }
        allDots = document.querySelectorAll(".points");
    }
    createPoint();

    function generateCoordinates(corDX, corDY) {
        let points = corDX > corDY ?  corDX : corDY;

        for (var i = 0; pointCordinates.length < points; i++) {
            let temp = [];
            temp.push(Math.floor(Math.random() * corDY));
            temp.push(Math.floor(Math.random() * corDX));

            if (JSON.stringify(pointCordinates[0]) !== JSON.stringify(temp)) {
                pointCordinates.push(temp);
            }
        }
        pointCordinates.shift();

        pointCordinates = Array.from(new Set(pointCordinates.map((e) => JSON.stringify(e)))).map(e => JSON.parse(e))
        return pointCordinates;
    }
})();
