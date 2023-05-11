const divCounter = 0;
const totalCount = 5000;

$.ajax({
  url: "https://data.cityofnewyork.us/resource/uip8-fykc.json",
  type: "GET",
  data: {
    "$limit": totalCount,
    "$$app_token": "KqeCXdROGdgFHuab9p12jBqb4"
  },
  success: function (data) {
    const perpRaceCount = {};

    // Loop through the data set and count the number of occurrences for each perp race category
    data.forEach(record => {
      const perpRace = record.perp_race;

      if (perpRace in perpRaceCount) {
        perpRaceCount[perpRace]++;
      } else {
        perpRaceCount[perpRace] = 1;
      }
    });

    const container = $('<div></div>').addClass('grid-container');
    const categoryList = $('<ul></ul>').addClass('category-list');
    const divContainer = $('<div></div>').addClass('div-container');

    // Create list items for each perpRace category
    for (const category in perpRaceCount) {
      const count = perpRaceCount[category];
      const percentage = (count / totalCount) * 100;

      const listItem = $('<li></li>').addClass('category-item').text(category);

      // Create labels for percentage and count
      const percentageLabel = $('<span></span>').addClass('percentage-label').text(`${percentage.toFixed(2)}% of arrests`);
      const countLabel = $('<span></span>').addClass('count-label').text(` with ${count} in total.`);

      // Add space between percentageLabel and countLabel
      const labelContainer = $('<div></div>').addClass('label-container');
      labelContainer.append(percentageLabel, countLabel);

      listItem.on('mouseenter', function () {
        const newDiv = $('<div></div>').addClass('category-div').css({
          width: percentage * 12 + 'px',
          height: percentage * 5 + 'px',

        });

        // Append the labelContainer to the listItem
        listItem.append(labelContainer);

        // Adjust position to stay within the viewport
        const viewportWidth = $(window).width();
        const listItemWidth = listItem.outerWidth(true);
        const listItemOffset = listItem.offset().left;
        const divWidth = newDiv.outerWidth(true);
        const divLeft = listItemOffset + listItemWidth + divWidth;

        if (divLeft > viewportWidth) {
          newDiv.css('right', listItemWidth + 'px');
        }

        divContainer.empty().append(newDiv);
      });

      listItem.on('mouseleave', function () {
        divContainer.empty();

        // Remove the labelContainer from the listItem
        labelContainer.remove();
      });

      categoryList.append(listItem);
    }

    container.append(categoryList);
    container.append(divContainer);

    $('body').append(container);
  },

  error: function (xhr, textStatus, errorThrown) {
    console.log(errorThrown);
  }
});






