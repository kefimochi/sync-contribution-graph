<h1 align="center">
  Sync Contribution Graph
</h1>

![GitHub Contributions Graph full squares that have various shades of green](img/cover-photo.png)

<a href="https://twitter.com/kefimochi" align="right">
    <img alt="Twitter: kefimochi" src="https://img.shields.io/twitter/follow/kefimochi.svg?style=social" target="_blank" align="right" />
</a>

## How to Use 🚀

1. [Create a new repo](https://github.com/new) and [clone it](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) on your local machine.

   > **Note:** You can't simply fork this repository because none of the commits will count toward the contribution graph.
   [More info here](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile#issues-pull-requests-and-discussions).

2. Clone this project locally and copy/paste it's contents into the repo you just created.
3. Run `npm i` in your terminal.
4. Use `run start` in order to trigger a series of terminal prompts that will help with configuration.
   > On Windows, please run it from Git Bash.

If you change your mind about these commits later, you can delete the repository and they'll disappear from your contribution graph.

<img height="400px" width="auto" src="img/usage.gif" alt="Terminal walkthrough of various prompts that help with configuration." />

## Requested Information 🌳

| Key        | Description                                                                                                                                                 | Default value                                        |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `username` | The username whose graph contributions you'd like to copy.                                                                                                  |                                                      |
| `year`     | Year that you would like to sync with provided `username`. Currently doesn't support multiple years.                                                        | Current year                                         |
| `execute`  | Let's the code know whether to simply generate `script.sh` that, when executed, will force push commits to `main`. Or to both generate and execute at once. | `false`, in other words generate _without_ execution |
| `confirm`  | A quick double check that you're ready to proceed.                                                                                                          |

## How do I know this is secure? 🔒

Explore the [code](src/index.js)! It's tiny and there aren't many dependencies.

It only scrapes publicly available data from existing GitHub contribution graphs. It does not have access to private commits or issues created. So I can promise that you will not get in trouble for syncing your personal and work GitHub graphs considering there isn't any private company code being exposed!

## On Project's Future ✨

There's a lot of potential features and automations that could be added! Something as basic as accepting multiple years to pull at once, or more complicated like having a GitHub Action that once per month/year/time period creates a PR with newer commits, making it effortless to keep them synced.

## Contribute 👪

PRs are welcome! One day I'll probably write a Contributing guide. This project is [MIT](LICENSE) licensed.
