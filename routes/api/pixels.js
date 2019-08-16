/*
 * This file is part of blinkenlights.
 *
 * blinkenlights is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * blinkenlights is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 */

const express = require('express');
const pixels = require('../../Pixels');
const router = express.Router();

router.get('/', (req, res) => res.json(pixels));

router.get('/:id', (req, res) => {
    id = parseInt(req.params.id);

    if (id >= 0 && id < pixels.length) {
        res.json(pixels[id]);
    } else {
        res.status(400).json({ msg: `Pixel ${req.params.id} not found!`});
    }
});

/* router.post('/', (req, res) => {
    res.send(req.body);
}); */

router.put('/:id', (req, res) => {
    id = parseInt(req.params.id);

    if (!isNaN(id) && id >= 0 && id < pixels.length) {
        if (!req.body.r || !req.body.g || !req.body.b) {
            res.status(400).json({ msg: `r, g, b required!`});
        } else {
            r = parseInt(req.body.r);
            g = parseInt(req.body.g);
            b = parseInt(req.body.b);
    
            if (isNaN(r) || r < 0 || r > 255) {
                res.status(400).json({ msg: `r needs to be a number in range [0 ... 255]!`});
            } else if (isNaN(g) || g < 0 || g > 255) {
                res.status(400).json({ msg: `g needs to be a number in range [0 ... 255]!`});
            } else if (isNaN(b) || b < 0 || b > 255) {
                res.status(400).json({ msg: `b needs to be a number in range [0 ... 255]!`});
            } else {
                pixels[id] = { "r": r, "g": g, "b": b };
                res.status(200).json({ msg: "ok" });
            }
        }
    } else {
        res.status(400).json({ msg: `Pixel ${req.params.id} not found!`});
    }
})

module.exports = router;