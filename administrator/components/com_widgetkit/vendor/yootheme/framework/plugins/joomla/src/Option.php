<?php

namespace YOOtheme\Framework\Joomla;

class Option
{
   /**
    * @var string
    */
    protected $file;

    /**
     * @var array
     */
    protected $data;

    /**
     * @var bool
     */
    protected $dirty = false;

    /**
     * Constructor.
     *
     * @param string $cache
     * @param string $file
     */
    public function __construct($cache, $file)
    {
        $this->file = "{$cache}/{$file}.php";
        $this->data = (file_exists($this->file) && is_array($data = require($this->file))) ? $data : array();
    }

    /**
     * Destructor.
     */
    public function __destruct()
    {
        if ($this->dirty) {
            @file_put_contents($this->file, '<?php return ' . var_export($this->data, true) . ';');
        }
    }

    /**
     * Gets a value.
     *
     * @param  string $name
     * @param  mixed  $default
     * @return mixed
     */
    public function get($name, $default = null)
    {
        return isset($this->data[$name]) ? $this->data[$name] : $default;
    }

    /**
     * Sets a value.
     *
     * @param string $name
     * @param mixed  $value
     */
    public function set($name, $value)
    {
        $this->data[$name] = $value;
        $this->dirty       = true;
    }
}
