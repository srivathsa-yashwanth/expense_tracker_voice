<h1>Expense Tracker with Voice Control</h1>
<h2>Description</h2>
<p>This application is an expense tracker that takes in information about your transactions and displays a neat 
    pie chart visualising all your incomes and expenses. The icing on the cake is that this React app makes use 
    of the Speechly NLP API, which enables us to use the app solely with voice commands with changes taking place
    instantly. This makes the process of providing inputs quite easy and enjoyable. <em>All of the data is being stored on 
        localStorage so your privacy is mostly taken care of.
    </em>
</p>
<p>This application was made after following this fantastic video by the channel <a href="https://www.youtube.com/watch?v=NnUFOWR_V4Y">Javascript Mastery.</a> </p>
<h2>Technologies used</h2>
<ul>
    <li>React</li>
    <li>Speechly</li>
    <li>Material Ui</li>
    <li>ChartJS</li>
</ul>
<h2>Usage Guide</h2>
<p>
    This web application is deployed <a href="https://srivathsa-yashwanth.github.io/expense_tracker_voice/">HERE</a>
</p>
<p>
    Transactions can be entered by simply filling out the fields in the form. If we wanted to give inputs via voice 
    instead, a pattern of instruction giving must be followed.
</p>
<p>First press spacebar to start the recording and make sure to allow the browser to use your microphone.</p>
<p>Then give out instructions in the following format:</p>
<p> add income|expense of (any number) {rupees} {in category} ( any category in the dropdown) {for} {any date} </p>
<p>The words wrapped in <strong>{}</strong> are optional while <strong>|</strong> indicates either of the both </p>
<p>Note that income and expense has different categories. Select each and look at the categories drop down to see them all.</p>
<h3>Possible Commands</h3>
<p>
    <em>"Add <strong>income</strong> of <strong>fifty thousand rupees</strong> in category <strong>salary</strong> for <strong>next friday</strong> "</em>
    <em>"Add <strong>expense</strong> of <strong>ten thousand rupees</strong> in category <strong>bills</strong> for <strong>tomorrow</strong> "</em>
</p>

