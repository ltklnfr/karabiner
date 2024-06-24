import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      // {
      //   type: "basic",
      //   description: "Disable CMD + Tab to force Hyper Key usage",
      //   from: {
      //     key_code: "tab",
      //     modifiers: {
      //       mandatory: ["left_command"],
      //     },
      //   },
      //   to: [
      //     {
      //       key_code: "tab",
      //     },
      //   ],
      // },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open(
      "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
    ),

    // b = "B"rowse
    b: {
      c: open("https://andsafe.atlassian.net/wiki/home"),
      g: open("https://github.com/ltklnfr?tab=repositoriese"),
      s: open("https://andsafe.atlassian.net/jira/software/c/projects/CURE/boards/187/backlog"),
      t: open("https://app.todoist.com/app/project/brain-dump-6VFF3crCjX3pf6gV"),
    },
    
    // f = "F"inder
    f: {
      spacebar: app("finder"),
      d: open("~/Downloads"),
      // d: open("~/Library/CloudStorage/OneDrive-FreigegebeneBibliotheken–andsafeAG/Design - General"),
    },
    
    // o = "O"pen applications
    o: {
      b: app("Google Chrome"), //browser
      c: app("ChatGPT"),
      e: app("Enpass"),
      f: app("FIgma"),
      i: app("IntelliJ IDEA CE"),
      k: app("Karabiner-Elements"),
      n: app("Notion"),
      m: app("Miro"),
      r: app("Raycast"),
      s: app("Spotify"),
      t: app("Todoist"),
      v: app("Visual Studio Code"),
      w: app("WhatsApp"),
      // Finder, Adobe, Slack, Filezilla, Sublime, Terminal, VPN
    },

    // m = "M"icrosoft applications
    m: {
      e: app("Microsoft Excel"),
      o: app("Microsoft Outlook"),
      p: app("Microsoft PowerPoint"),
      t: app("Microsoft Teams"),
      w: app("Microsoft Word"),
    },

    // s = "S"ystem
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      // "T"heme
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
    },

    // r = "R"aycast
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      h: open("raycast://extensions/raycast/clipboard-history/clipboard-history"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
