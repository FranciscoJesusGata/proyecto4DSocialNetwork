var ctx = $("#like-dislike");
var chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Likes', 'Dislikes'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: [
              '#0072ff',
              '#f54141'
            ],
            data: [75, 25]
        }],
    },
    options: {}
});
