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
        // to_if_alone: [
        //   {
        //     key_code: "escape",
        //   },
        // ],
        type: "basic",
      },
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "right_command",
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
            // key_code: "tab",
            shell_command: "open raycast://extensions/raycast/navigation/switch-windows"
          },
        ],
      },
      // {
      //   type: "basic",
      //   description: "Set Hotkey for Standard-Password",
      //   from: {
      //     key_code: "spacebar",
      //     modifiers: {
      //       mandatory: ["left_command"],
      //     },
      //   },
      //   to: [
      //     {
      //       key_code: "spacebar",
      //     },
      //   ],
      // },
    ],
  },
  ...createHyperSubLayers({
    tab: open("raycast://extensions/raycast/navigation/switch-windows"),

    // a = "A"pplications
    a: {
      spacebar: app("Microsoft Teams"),
      c: app("ChatGPT"),
      e: app("Enpass"),
      f: app("Figma"),
      i: app("IntelliJ IDEA CE"),
      j: app("Terminal"),
      k: open("raycast://script-commands/open-outlook-calendar"),
      m: app("Miro"),
      n: app("Notion"),
      o: open("raycast://script-commands/open-outlook-mail"),
      // o: open("raycast://extensions/raycast/navigation/switch-windows"), // Open Window
      r: app("Raycast"),
      s: app("Slack"),
      t: app("Todoist"),
      v: app("Visual Studio Code"),
      w: app("WhatsApp"),
    },

    // c = Adobe "C"reative "C"loud
    c: {
      spacebar: app("Adobe Acrobat"),
      i: app("Adobe InDesign 2024"),
      p: app("Adobe Photoshop 2024"),
      l: app("Adobe Illustrator"),
    },
    
    // f = "F"inder
    f: {
      spacebar: app("Finder"),
      j: open("~/Downloads"),
      g: open("~/github"),
      k: open("~/OneDriveDesignGeneral"), // Symlink
    },

    // m = "M"icrosoft
    // m: {
    //   e: app("Microsoft Excel"),
    //   w: app("Microsoft Word"),
    // },

    // q = "Q"uick
    q: {
      spacebar: open("raycast://extensions/ltklnfr/open-everything/shortcut"),
      m: open("raycast://script-commands/whatsapp-miriam"),
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
      a: open("raycast://script-commands/open-chrome-tab?arguments=andsafe-sso.awsapps.com/start#/"),
      c: open("raycast://script-commands/open-chrome-tab?arguments=app.contentful.com"),
      d: open("raycast://script-commands/open-chrome-tab?arguments=dribbble.com"),
      g: open("raycast://script-commands/open-chrome-tab?arguments=github.com/ltklnfr"),
      i: open("raycast://script-commands/open-chrome-tab?arguments=app.invoiz.de"),
      j: open("raycast://script-commands/open-chrome-tab?arguments=andsafe.atlassian.net/jira/software/c/projects/CURE/boards/187"),
      k: open("raycast://script-commands/open-chrome-tab?arguments=calendar.google.com"),
      m: open("raycast://script-commands/open-chrome-tab?arguments=mail.google.com"),
      o: open("raycast://script-commands/open-chrome-tab?arguments=andsafe1129.zendesk.com"),
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
