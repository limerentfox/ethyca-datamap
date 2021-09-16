# Ethyca Technical Challenge -- Open Source Engineer (Typescript)

## Introduction to Data Maps
Over the last several years, data privacy regulations like GDPR and CCPA are coming into affect all over the world and software teams are figuring out how to prove compliance. One key aspect of this is the need to create an accurate inventory of all the data processing systems a team uses, which categories of data are processed by each, and how they relate to each other. This is commonly referred to as a "data map", though the specific term given in GDPR is an “Article 30: Records of Processing Activities” (see this page for details: [Article 30](https://gdpr-info.eu/art-30-gdpr/)).

The typical version of a data map is simply a spreadsheet report that lists a lot of details about all the individual systems a company uses. You can see an example of this here:
![image](https://user-images.githubusercontent.com/1834295/133648226-85304283-b87b-484a-9b69-a0964412fe53.png)
(NOTE: There are a lot more columns to the right, too… (source: [ico.org.uk template](https://ico.org.uk/media/for-organisations/documents/2172937/gdpr-documentation-controller-template.xlsx))

## Your Task
We believe we can do better than a spreadsheet to visualize and understand a data map! **Your challenge is to write a small frontend browser-based application that visualizes an interactive data map given a static list of system definitions.**

The requirements for this app are below, and you should try to accomplish as many of them as possible without compromising on (reasonable) quality for a prototype that we're expecting to incrementally improve over time. Therefore, we don't expect this to be production-grade, but it means that code style, comments, and general code hygiene matter! With that in mind please tackle these requirements incrementally and **stop working after a maximum of 4 hours**!

- Create a basic app using your preferred framework (React, Vue, Angular, etc.). There are no minimum browser requirements so feel free to use your favorite browser and preferred libraries, and we're not expecting this to be production-grade so any reasonable boilerplate is fine here.
- Convert the sample data ([sample_data.csv](sample_data.csv)) as needed into whatever format you will use for rendering. Feel free to copy the sample data directly into the source code as a constant; there's no requirement to load this dynamically from a filesystem or similar.
- Render a visual data map that displays all the systems in a grid, categorized by system type. Your layout algorithm shouldn’t be static here, you should expect to be able to add/remove systems and relayout the map accordingly. Use your own judgment to decide what data should be shown, but at a minimum we’d want to see something like the mockup below, which includes:
  - System Name
  - Data Categories (excluding duplicate categories across multiple uses)
  - Systems arranged into groups by System Type
- Add some interactive button elements to filter our map! Using your best judgment, add some controls on the page to:
  - Filter systems based on a “data use category”
  - Filter systems based on a selection of “data categories”
  - Relayout the systems based on either “system type” or “data use category”
- Get fancy with our visuals. Add as much flair and styling as you can muster; here are some ideas:
  - Render arrows between systems to show the “system dependencies”
  - Add animations for when filters are changed
  - Display the system descriptions with an expandable drawer
  - …surprise us!

## Mockup
Here's a basic design that could work, to clarify what we mean by a "grid, categorized by system type":
![image](https://user-images.githubusercontent.com/1834295/133650397-469824bf-0a71-4c83-9ec8-731e4a8f8f64.png)


## Notes
- Please work independently without code review by others.
- It's our intention that you spend between 3 and 4 hours on this task.
- This challenge is deliberately vague on detail to give candidates the opportunity for a wide range of solutions. That being said, feel free to reach out and ask questions as needed.
- There is no 100% correct solution, be creative! We are just as interested in your approach to problem solving as we are in your actual solution.
- Remember that we'll schedule a debrief interview with you afterwards to discuss the code and ask questions, so you'll be able to explain what you've done!
- Code style, comments, and general code hygiene matter despite this being a test!

## Delivery
- Once completed, please create a README file describing:
  - How to run your project (or where it is hosted),
  - How much time you spent building the project,
  - Any assumptions you made,
  - Any trade-offs you made,
  - Any special/unique features you added,
  - Anything else you want us to know about,
  - Any feedback you have on this technical challenge -- we care deeply about our hiring process here at Ethyca, and about the engineers who go through it (that's you!) -- we wholeheartedly promise any feedback will be met with a warm thank you!
- The assignment can be published and shared with us via any code sharing platform such as Github, Gitlab, or sent as a .zip file to the Ethyca employee who sent you this task.
- We'll review your submission in advance of your debrief interview, and look forward to talking to you about it!
