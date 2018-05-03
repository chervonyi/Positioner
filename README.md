# Positioner
_**Description:**_ The foolish task for working with strings and pointers.

_**Task:**_ create "Positioner" which provides the set of possibilities for working with given string. The positioner contains inner pointer. Operations are executed according to pointer position.

_**Required methods:**_
* _has("substring")_ - check if substring is present in the workspace.
* _next("substring")_ - returns position of the next substring. Pointer moves forward according to the search direction.
* _prev("substring")_ - returns position of the previous substring.
* _reset()_ - reset pointer position.
* _changeSearchDirection()_ - change direction of search to the opposite.
* _forward(N)_ - offsets pointer position forwards in appropriate direction by N characters.
* _backward(N)_ - offsets pointer position backwards in appropriate direction by N characters.
* _add("substring")_ - inserts substring at the current pointer position.
* _remove(N)_ - removes N characters in appropriate direction.
* _replace("from", "to")_ - replaces every entries.

<br />
<img src="https://i.imgur.com/VNnsc8I.png" width="800" />
<br />

# Changelog:
#### `UPDATE v.1.2`
* Added UI
* Minor changes

#### `UPDATE v.1.3` 
* Added a lot more JS events
* Fixed some problems

#### `UPDATE v.2.0`
* Added Log-panel with possibility of rollback
* Work with reverse direction have been fixed
* Minor changes
* Redesign UI
