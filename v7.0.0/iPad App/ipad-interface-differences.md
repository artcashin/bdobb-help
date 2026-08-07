---
type: Note
tags: [bdobb, help, ipad, touch, interface, hover]
---

# iPad Interface Differences

BDOBB's desktop interface — the icon rail and AI pane that glide open on hover (see [[layout-and-navigation|Layout and Navigation]]) — assumes a cursor. A fingertip doesn't hover; it either touches or it doesn't. This page covers how the app adapts.

## Touch mode vs. hover mode

- **With a trackpad or Magic Keyboard attached**, iPadOS produces a real pointer, and BDOBB's panels behave exactly as they do on desktop — no changes needed.
- **With touch only**, the app switches to a second interaction dialect: **tap to open, tap anywhere else to dismiss.** One deliberate exception: the chat pane won't fold up while you're actively typing in its input box, so you can't lose your place mid-sentence.

The app decides which mode to use **live** — dock a keyboard and it speaks hover; detach it and the same running session switches to tap, with no setting to change anywhere.

## What isn't touch-native yet

Rearranging the dashboard *layout* by finger isn't supported yet — dragging a card and scrolling the page currently compete for the same gesture. Viewing, reading, charts, and chat all work well by touch; redecorating a dashboard still wants a trackpad. Pinch-to-zoom is intentionally left enabled everywhere, including inside dense tables, where pinching to read is treated as a feature rather than an accidental side effect.

## Settings live on the device, and they win

The iPad app keeps its own settings, separate from the desktop app's, and they survive reinstalls — and a setting saved on the device **outranks** whatever your build-time config says. If you change a backend address in your build config, reinstall, and see no change, this is why: the app is honoring what you told it directly on the device last time, not ignoring your new config. Change the value in the app's own settings, or clear the app's data before reinstalling. See [[app-data-and-settings|App Data and Settings]].

---
*Source: Adventures in OpenBB, Ep. 7 — "The iPadOS Adventure."*
*See also: [[layout-and-navigation|Layout and Navigation]] · [[app-data-and-settings|App Data and Settings]] · [[installing-on-ipad|Installing BDOBB on iPad]]*
