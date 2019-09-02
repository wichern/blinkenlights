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

const express = require('express')
const logger = require('./middleware/logger')
const screen = require('./Screen')

const app = express();

var myScreen = new screen();

app.use(logger);
app.use(express.json()); // Body Parser
app.use(express.urlencoded({ extended: false }));
app.use('/api/pixels', require('./routes/api/pixels'))

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));