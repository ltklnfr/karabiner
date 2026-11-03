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
      //       // key_code: "tab",
      //       shell_command: "open raycast://extensions/raycast/navigation/switch-windows"
      //     },
      //   ],
      // },
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
    escape: open("raycast://customWindowManagementCommand?&name=HomeOffice"),
    spacebar: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
    return_or_enter: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
    tab: open("raycast://extensions/raycast/navigation/switch-windows"),
    1: open("raycast://extensions/raycast/script-commands/play-spotify-playlist?arguments=1DtXvqPVxU77RgUWToH34t"),
    2: open("raycast://extensions/raycast/script-commands/play-spotify-playlist?arguments=37i9dQZF1DXa2SPUyWl8Y5"),
    3: open("raycast://extensions/raycast/script-commands/play-spotify-playlist?arguments=17EIX7k8h0CX90rCtn5lYq"),

    // a = "A"pplications
    a: {
      spacebar: app("Microsoft Teams"),
      return_or_enter: open("raycast://extensions/raycast/raycast-ai/ai-chat?context=%7B%22preset%22:%22D346FAB9-BE3F-4E7B-876C-39A7F15ACA48%22%7D"),
      c: app("Claude"),
      e: app("Enpass"),
      f: app("Figma"),
      i: app("IntelliJ IDEA CE"),
      j: app("Terminal"),
      k: open("raycast://extensions/raycast/script-commands/open-outlook-kalender"),
      m: open("raycast://extensions/raycast/script-commands/open-outlook-e-mail"),
      n: app("Notion"),
      o: app("Obsidian"),
      p: app("Passwords"),
      r: app("Raycast"),
      s: app("Slack"),
      t: app("Todoist"),
      v: app("Visual Studio Code"),
      w: app("WhatsApp"),
      x: app("zoom.us"),
    },

    // c = Adobe "C"reative "C"loud
    c: {
      spacebar: app("Adobe Acrobat"),
      i: app("Adobe InDesign 2025"),
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

    // // q = "Q"uick
    // q: {
    //   spacebar: open("raycast://extensions/ltklnfr/open-everything/shortcut"),
    //   s: open("raycast://ai-commands/webseite-zusammenfassen"),
    // },

    // // r = "R"aycast
    // r: {
    //   e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
    //   n: open("raycast://extensions/raycast/floating-notes/toggle-floating-notes-window"),
    //   p: open("raycast://extensions/raycast/raycast/confetti"),
    // },

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
      l: open("raycast://extensions/raycast/system-actions/toggle-system-appearance"),
      t: open("raycast://extensions/raycast/system/toggle-system-appearance"),
    },

    // w = "W"eb
    w: {
      spacebar: app("Google Chrome"),
      a: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=andsafe-sso.awsapps.com/start#/"),
      c: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=app.contentful.com"),
      d: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=dribbble.com"),
      g: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=github.com/ltklnfr"),
      i: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=app.invoiz.de"),
      j: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=pv-newbiz.atlassian.net/jira/software/c/projects/UFO/boards/9/backlog"),
      k: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=calendar.google.com"),
      m: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=mail.google.com"),
      z: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=youtube.com"),
      y: open("raycast://extensions/raycast/script-commands/open-chrome-tabs?arguments=andsafe1129.zendesk.com")
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
