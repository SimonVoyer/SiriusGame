<?php

	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}

	require_once("CommonAction.php");

	class JoinGameAction extends CommonAction {
		public $APIResponse;

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);

		}

		protected function executeAction() {
			if (isset($_POST["id"])) {
				$data = [];
				$data["key"] = $_SESSION["key"];
				$data["id"] = $_POST["id"];
				$this->APIResponse = $this->callAPI("enter", $data);
			}
		}
	}