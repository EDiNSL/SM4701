
// Put titles, image files names and descritpions you want to see on the website. A bit rough but it works.
// All 3 MUST HAVE the same length
const titles = ["<span id = \"highlight\">\"Scientific data\"</span> vs scientific data", 
"Some methods are more comforting than the others", 
"<span id = \"highlight\">Self-report data studies</span> tend to yield higher averages...",
"...and most of them are from the Anglosphere", 
"Some countries have higher <span id = \"highlight\">inflation</span>"]
const images = ["2012_current.png", "method_dif.png", "all_studies.svg", "country_method.png","country_method_dif.svg"]
// const images = ["cock1.png"]
const descriptions = ["If we use the average of scientifically measured data from the meta-analysis as verification, the 2012 data has <span id = \"highlight\">inflated measurement</span> almost across the board; up to <span id = \"highlight\">3.24cm</span>. <br> <br> India, France, and the US on the other hand have their sizes under-reported by the 2012 data.", 
"Let's ignore the 2012 data, and look solely at the studies selected by the meta-analysis. <br> <br> There are mainly two ways to measure a phallus' maximum size objectively; either when it's stretched to the max or it's erect. <br> <br> <span id = \"highlight\">Studies with self-reported data</span> are selected from the meta-analysis as a point of comparison for their high rate of citation. <br><br> Results of the studies are grouped by method of measurement, and the average is taken. We can already see that <span id = \"highlight\">self-report</span> data has a <span id = \"highlight\">significantly higher average</span> than the others by centimeters.",
"While most scientific studies came up with a number around 14cm, <span id = \"highlight\">studies with self-reported data</span> mostly came up with around <span id = \"highlight\">16cm</span>. <br><br> Ranges are in cm.",
"The average results per methods of measurement (<span id = \"hi1\">meaured when stretched</span>, <span id = \"hi2\">measured when erect</span>, and <span id = \"hi3\">self-report</span>) is taken for each country. Countries with self-reported data include <span id = \"highlight\">Australia</span>, <span id = \"highlight\">UK</span>, and <span id = \"highlight\">US</span>. The <span id = \"highlight\">India</span> data is special in that it's actually a part of a bigger study where the participants' penises are also scientifically measured . <br><br>Countries are sorted by the average of all studies, and while \"white\" countries are loosely more on the larger side, one can also see the high variance and break in continuity (i.e. Black>White>Asian), coupled with the <span id = \"highlight\">influence of self-report data</span> for Lynn's theory to hold any water. <br><br> We can also see that the 6-inch myth King (2020) has mentioned aligns with his findings that it's drawn from mainly white participants.",
"There are 3 countries where there exist self-report data and scientifically measured data. <br><br> The two western powers inflate their sizes by up to <span id = \"highlight\">2cm</span>. <br><br>It is important to note that the Indian data is drawn from one single study, which may influence the outcome of self-reported data besides cultural differences. "
]

$(window).on('load', function() {
    $("#compare").twentytwenty({
        default_offset_pct: 0.95, // How much of the before image is visible when the page loads
        orientation: 'horizontal', // Orientation of the before and after images ('horizontal' or 'vertical')
        before_label: '2012 study', // Set a custom before label
        after_label: 'meta-analysis', // Set a custom after label
        no_overlay: true, //Do not show the overlay with before and after
        move_slider_on_hover: false, // Move slider on mouse hover?
        move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement. 
        click_to_move: true // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
      });
  });

$(document).ready(async function () {
    // const loadedPictures = getImages()

    for (let i = 0; i < images.length; i++) {
        createSection(titles[i], images[i], descriptions[i])
    }

    // Fade in effect - https://jsfiddle.net/tcloninger/e5qaD/
    /* Every time the window is scrolled ... */
    $(window).scroll(function () {

        /* Check the location of each desired element */
        $('.hideAnimation').each(function (i) {
            let bottomOfObject = ($(this).offset().top + $(this).outerHeight())
            let bottomOfWIndow = $(window).scrollTop() + $(window).height()

            /* If the object is visible in the window, fade it it */
            if (bottomOfWIndow > bottomOfObject - 600) { // - 600 is number of pixels I substract to rush the animation. 0 if you want the object to be fully in the frame before animation.
                $(this).animate({ 'opacity': '1' }, 900); // Adjust length of animation (ms) if needed
            }
        })

    })
})



function createSection(title, image, description) {
    /**
     * Dynamically create sections of your webiste. Creates elements using JS and adds them to HTML.
     */

    // The whole section dedicated to presentation of one graph.
    const wholeSection = document.createElement("section")
    wholeSection.classList.add("graphSection")

    // Title of the section
    const header = document.createElement("h1")
    header.innerHTML = title

    // Main part of the section - image + text description
    const mainPart = document.createElement("div")
    mainPart.classList.add("graph")

    const graphSide = document.createElement("div")
    graphSide.classList.add("imgContainer")

    const tableauPicture = new Image()
    tableauPicture.src = 'media\\' + image
    tableauPicture.classList.add("hideAnimation") // Adds a class that allows animation

    const descriptionSide = document.createElement("div")
    descriptionSide.classList.add("textContainer")
    const paragraph = document.createElement("p")
    paragraph.innerHTML = description

    // Putting things together into the main
    wholeSection.appendChild(header)
    graphSide.appendChild(tableauPicture)
    mainPart.appendChild(graphSide)

    descriptionSide.appendChild(paragraph)
    mainPart.appendChild(descriptionSide)

    wholeSection.appendChild(mainPart)

    const main = document.getElementById("mainContainer")
    main.appendChild(wholeSection)
}


