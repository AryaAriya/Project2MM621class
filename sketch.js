let biomeData;
let iconData;
let biomes = [];
let icons = {};
let customFont;
let currentCanvasHeight = 4700;

function preload(){
  biomeData = loadJSON("biomes.json");
  iconData = loadJSON("icons.json");
  customFont = loadFont('minecraftia/Minecraftia-Regular.ttf');
}

function setup() {
  createCanvas(1200, 4700);
  textFont(customFont);
  for(let biomeName in iconData){
    icons[biomeName] = loadImage(iconData[biomeName]);
  }
}

function draw() {
  background(234, 222, 202);

  fill(0);
  textSize(32);
  textAlign(CENTER, TOP);
  text("Minecraft 'Travel Map'", width /2, 20);

  fill(0);
  textSize(11);
  textAlign(CENTER, TOP);
  text("by Arya Aswini for Project 2", width / 2, 65);

  fill(0);
  textSize(16);
  textAlign(CENTER, TOP);
  text("Click on a biome to find more about it", width / 2, 110);

  if (biomeData && biomes.length == 0){
    let rawData = Object.values(biomeData);
    for(let i = 0; i < rawData.length; i++){
      let b = rawData[i];
      b.isOpen = false;
      biomes.push(b);
    }
  }
  
  if (biomes && biomes.length > 0){
      let itemWidth = 360;
      let headerHeight = 60;
      let contentHeight = 310;
      let gap = 20;
      let startX = 40;
      let numCols = 3;
      let colHeights = new Array(numCols).fill(120);

     for(let i = 0; i < biomes.length; i++){
      let biome = biomes[i];
      let colIndex = i % numCols;
      let xPos = startX + colIndex * (itemWidth + gap);
      let yPos = colHeights[colIndex];

      biome.clickX = xPos;
      biome.clickY = yPos;
      biome.clickW = itemWidth;
      biome.clickH = biome.isOpen ? (headerHeight + contentHeight) : headerHeight;

      let isHovered =
      mouseX >= biome.clickX &&
      mouseX <= biome.clickX + biome.clickW &&
      mouseY >= biome.clickY &&
      mouseY <= biome.clickY + biome.clickH;

      let title = biome.displayName || biome.Name || "Unnamed Biome";

      if(biome.isOpen){
        stroke(0);
        strokeWeight(3);
        fill(234, 220, 202);
        rect(xPos, yPos, itemWidth, headerHeight + contentHeight);
        line(xPos, yPos + headerHeight, xPos + itemWidth, yPos + headerHeight); 

        textSize(16.5);
        textAlign(LEFT, CENTER);
        fill(0);
        noStroke();
        text(title, xPos + 15, yPos + (headerHeight / 2));

        let tagX = xPos +15;
        let tagY = yPos + headerHeight + 12;
        let tagHeight = 22;
        let tagsDrawn = false;

        if(biome.temperature !== undefined && biome.temperature > 0.85){
          drawBadge(tagX, tagY, "High Heat Hazard",  color(230, 75, 60), color(255));
          tagY += tagHeight + 6;
          tagsDrawn = true;
        }

        if(biome.depth !== undefined && biome.depth < 0){
          drawBadge(tagX, tagY, "Ocean Exploration Required", color(45, 130, 210), color(255));
          tagY += tagHeight + 6;
          tagsDrawn = true;
        }

        if (biome.child !== undefined && biome.child !== null && biome.child !== "" && biome.child !== "null") {
          drawBadge(tagX, tagY, "Sub-variants Available", color(75, 160, 100), color(255));
          tagY += tagHeight + 6;
          tagsDrawn = true;
        }

        let textY = tagsDrawn ? tagY + 4 : yPos + headerHeight + 15;
        textSize(13);
        textAlign(LEFT, TOP);
        
        text(`Category: ${biome.category || 'N/A'}`, xPos + 15, textY);
        text(`Temperature: ${biome.temperature!== undefined ? biome.temperature : 'N/A'}`, xPos + 15, textY + 26);
        text(`Precipitation: ${biome.precipitation || 'N/A'}`, xPos + 15, textY + 52);
        text(`Depth: ${biome.depth !== undefined ? biome.depth : 'N/A'}`, xPos + 15, textY + 78);
        text(`Dimension: ${biome.dimension || 'N/A'}`, xPos + 15, textY + 104);
        text(`Display Name: ${biome.displayName || 'N/A'}`, xPos + 15, textY + 128, itemWidth - 20, 90);
        text(`Color: ${biome.color !== undefined ? biome.color : 'N/A'}`, xPos + 15, textY + 159);
        if (biome.color !== undefined) {
             let c = biome.color;
             let r = (c >> 16) & 255;
             let g = (c >> 8) & 255;
             let b = c & 255;
             fill(r, g, b);
             stroke(0);
             strokeWeight(3);
             rect(xPos + 300, textY + 165, 18);
        }
        fill(0);   
        noStroke();
        text(`Rainfall: ${biome.rainfall !== undefined ? biome.rainfall : 'N/A'}`, xPos + 15, textY + 182);
        text(`Child: ${biome.child !== undefined ? biome.child : 'N/A'}`, xPos + 15, textY + 208);
        
        colHeights[colIndex] += headerHeight + contentHeight + gap; 

    } else {
      fill(234, 222, 202); 
      rect(xPos, yPos, itemWidth, headerHeight);

      textSize(16.5);
      textAlign(LEFT, CENTER);
      fill(0);
      noStroke();
      text(title, xPos + 15, yPos + (headerHeight / 2)); 
    
      colHeights[colIndex] += headerHeight + gap;
    }

    if (isHovered) {
    let img = icons[biome.name];

     if (img) {
       image(img, xPos + itemWidth - 45, yPos + 7, 32, 32);
    }

    console.log(biome.name);
    console.log(icons[biome.name]);
   }
  }
     let maxColHeight = Math.max(...colHeights); 
     fill(0);
     textSize(11);
     textAlign(CENTER, TOP);
     let dataLink;
     text("Data Set Used: https://github.com/PrismarineJS/minecraft-data/blob/master/data/pc/1.11/biomes.json", width / 2, maxColHeight + 20);
     text("Images are from Minecraft wiki; all images belong to Mojang", width / 2, maxColHeight + 50);
     text("Cursor is from https://www.rw-designer.com/cursor-library; cursor is from Minecraft Cursors set made by Neil", width / 2, maxColHeight + 80);
     text("Font is Minecraftia; font made by Andrew Tyler", width / 2, maxColHeight + 110);
     let footerSpace = 200;
     let totalNeededHeight = maxColHeight + footerSpace; 
     if(totalNeededHeight !== currentCanvasHeight){
        currentCanvasHeight = totalNeededHeight; 
        resizeCanvas(width, currentCanvasHeight); 
     }  
  }  
}

function drawBadge(x, y, label, bgColor, textColor) {
  push();
  rectMode(CORNER);
  stroke(0);
  strokeWeight(3);
  fill(bgColor);
  
  textSize(11);
  let badgeW = textWidth(label) + 16;
  rect(x, y, badgeW, 22, 4); 
  
  noStroke();
  fill(textColor);
  textAlign(LEFT, CENTER);
  text(label, x + 8, y + 11);
  pop();
}

function mousePressed(){
  for (let i = 0; i < biomes.length; i++) {
    let biome = biomes[i];

    if (mouseX >= biome.clickX && mouseX <= biome.clickX + biome.clickW &&
        mouseY >= biome.clickY && mouseY <= biome.clickY + biome.clickH) {
      biome.isOpen = !biome.isOpen; 
      break;
    }
   }
  }



