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
          // set all key_codes to use caps_lock as hyper without layers
          {
            key_code: "left_command",
            modifiers: [
                "left_shift",
                "left_option",
                "left_control"
            ],
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
      {
        type: "basic",
        description: "Disable CMD + Tab to force Hyper Key usage",
        from: {
          key_code: "tab",
          modifiers: {
            mandatory: ["left_command"],
          },
        },
        to: [
          {
            key_code: "tab",
          },
        ],
      },
    ],
  },
  ...createHyperSubLayers({
    // spacebar: open(
    //   open("raycast://extensions/raycast/window-management/maximize"),
    // ),

    // a = "A"pplications
    a: {
      spacebar: app("Microsoft Teams"),
      c: app("ChatGPT"),
      e: app("Enpass"),
      f: app("Figma"),
      g: app("Google Chrome"), 
      i: app("IntelliJ IDEA CE"),
      j: app("Terminal"),
      k: open("raycast://script-commands/open-outlook-calendar"),
      m: open("raycast://script-commands/open-outlook-mail"),
      n: app("Notion"),
      p: app("Bitwarden"), // Password
      r: app("Raycast"),
      s: app("Slack"),
      v: app("Visual Studio Code"),
      w: app("WhatsApp"),
    },
    
    // f = "F"inder
    f: {
      spacebar: app("Finder"),
      j: open("~/Downloads"),
      // k: open("~/Library/CloudStorage/OneDrive-FreigegebeneBibliotheken–andsafeAG/Design - General"),
    },

    // r = "R"aycast
    r: {
      e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      p: open("raycast://extensions/raycast/raycast/confetti"),
    },

    // s = "S"ystem
    s: {
      spacebar: app("Systemeinstellungen"),
      i: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      // u: {
      //   to: [
      //     {
      //       key_code: "display_brightness_increment",
      //     },
      //   ],
      // },
      // j: {
      //   to: [
      //     {
      //       key_code: "display_brightness_decrement",
      //     },
      //   ],
      // },
      l: open(`raycast://extensions/raycast/system/lock-screen`),
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
    },

    // w = "W"eb
    w: {
      spacebar: app("Google Chrome"),
      c: open("raycast://script-commands/open-chrome-tab?arguments=app.contentful.com"),
      g: open("raycast://script-commands/open-chrome-tab?arguments=github.com/ltklnfr"),
      j: open("raycast://script-commands/open-chrome-tab?arguments=andsafe.atlassian.net/jira/software/c/projects/CURE/boards/187"),
      k: open("raycast://script-commands/open-chrome-tab?arguments=calendar.google.com"),
      m: open("raycast://script-commands/open-chrome-tab?arguments=mail.google.com"),
      u: open("raycast://script-commands/open-chrome-tab?arguments=andsafe.atlassian.net/jira/software/c/projects/UXUI/boards/198"),
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
